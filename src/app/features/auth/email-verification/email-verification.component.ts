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
  errorMessage: string = '';

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

  async onSubmit() {
    if (this.verificationForm.valid) {
      const otp = Object.values(this.verificationForm.value).join('');
      try {
        await this.authService.verifyEmail(otp);
        // Navigate to login on success
        this.router.navigate(['/login']); // Changed from /auth/login to /login to match routes
      } catch (error: any) {
        this.errorMessage = error.message || 'Verification failed. Please try again.';
      }
    }
  }

  async resendCode() {
    if (!this.isResending) {
      this.isResending = true;
      try {
        await this.authService.resendVerificationCode(this.email);
        this.remainingTime = 600; // Reset timer to 10 minutes
        this.startTimer();
        this.verificationForm.reset();
      } catch (error: any) {
        this.errorMessage = error.message || 'Failed to resend code. Please try again.';
      } finally {
        this.isResending = false;
      }
    }
  }
}
