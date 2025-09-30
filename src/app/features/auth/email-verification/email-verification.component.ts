import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  verificationForm: FormGroup;
  remainingTime: number = 600; // 10 minutes in seconds
  timer: any;
  email: string = '';
  isResending: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.startTimer();

    // Auto-focus next input
    this.verificationForm.valueChanges.subscribe(value => {
      for (let i = 1; i <= 5; i++) {
        const currentInput = document.getElementById(`digit${i}`) as HTMLInputElement;
        const nextInput = document.getElementById(`digit${i + 1}`) as HTMLInputElement;
        if (value[`digit${i}`] && nextInput) {
          nextInput.focus();
        }
      }
    });
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
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && next !== null) {
      const nextInput = document.getElementById(`digit${next}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, current: number) {
    if (event.key === 'Backspace') {
      const prevInput = document.getElementById(`digit${current - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
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
