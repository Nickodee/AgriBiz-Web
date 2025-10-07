import { Component, OnInit, ViewChildren, QueryList, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  verificationForm: FormGroup;
  remainingTime: number = 600; // 10 minutes in seconds
  timer: any;
  email: string = '';
  isResending: boolean = false;
  isVerifying: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showSuccessAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit6: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }

  ngOnInit() {
    // Get email from registration state
    this.email = this.authService.getRegisteredEmail() || '';
    console.log('Initialized email verification component:', {
      email: this.email,
      hasEmail: !!this.email
    });

    if (!this.email) {
      console.warn('No email found in registration state');
      this.errorMessage = 'Email not found. Please try registering again.';
    }

    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onInput(event: any, current: number, next: number | null) {
    if (!isPlatformBrowser(this.platformId)) return;

    const input = event.target;
    const value = input.value;

    if (value.length === 1 && next !== null) {
      const inputs = this.otpInputs.toArray();
      if (inputs[next - 1]) {
        inputs[next - 1].nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, current: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (event.key === 'Backspace') {
      const inputs = this.otpInputs.toArray();
      if (inputs[current - 2]) {
        inputs[current - 2].nativeElement.focus();
      }
    }
  }

  onSubmit() {
    console.log('Form submission attempt:', {
      isValid: this.verificationForm.valid,
      formValue: this.verificationForm.value,
      email: this.email
    });

    if (this.verificationForm.valid) {
      this.isVerifying = true;
      this.errorMessage = '';
      this.successMessage = '';

      const otp = Object.values(this.verificationForm.value).join('');
      console.log('Submitting OTP:', otp);

      this.authService.verifyEmail(otp).subscribe({
        next: (response: any) => {
          console.log('Verification success:', response);
          this.successMessage = 'Email verified successfully! Redirecting to login...';
          this.showSuccessAlert = true;

          // Wait for 2 seconds to show the success message before redirecting
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error: any) => {
          console.error('Verification error:', error);
          this.errorMessage = error.error?.message || error.message || 'Verification failed. Please try again.';
          this.verificationForm.reset();

          // Focus on the first input after error
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              const inputs = this.otpInputs.toArray();
              if (inputs[0]) {
                inputs[0].nativeElement.focus();
              }
            });
          }
        },
        complete: () => {
          console.log('Verification request completed');
          this.isVerifying = false;
        }
      });
    } else {
      console.log('Form validation failed:', {
        errors: this.verificationForm.errors,
        controls: Object.keys(this.verificationForm.controls).reduce((acc: any, key: string) => {
          acc[key] = {
            errors: this.verificationForm.get(key)?.errors,
            value: this.verificationForm.get(key)?.value
          };
          return acc;
        }, {})
      });
    }
  }

  async resendCode() {
    if (!this.isResending) {
      this.isResending = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        await this.authService.resendVerificationCode(this.email);
        this.successMessage = 'New verification code sent successfully!';
        this.remainingTime = 600; // Reset timer to 10 minutes
        this.startTimer();
        this.verificationForm.reset();

        // Clear success message after 3 seconds
        setTimeout(() => {
          if (this.successMessage === 'New verification code sent successfully!') {
            this.successMessage = '';
          }
        }, 3000);

        // Focus on first input
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            const inputs = this.otpInputs.toArray();
            if (inputs[0]) {
              inputs[0].nativeElement.focus();
            }
          });
        }
      } catch (error: any) {
        this.errorMessage = error.message || 'Failed to resend code. Please try again.';
      } finally {
        this.isResending = false;
      }
    }
  }
}
