import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordData = {
    newPassword: '',
    confirmPassword: ''
  };

  isValidToken = false;
  passwordChanged = false;
  isLoading = false;
  errorMessage = '';
  showNewPassword = false;
  showConfirmPassword = false;
  resetToken = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // First check URL parameters for token
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];

      // If no token in URL, check localStorage
      if (!this.resetToken) {
        this.resetToken = localStorage.getItem('resetToken') || '';
      }

      if (this.resetToken) {
        console.log('Reset token found:', {
          source: params['token'] ? 'URL' : 'localStorage',
          tokenLength: this.resetToken.length,
          tokenPreview: `${this.resetToken.substring(0, 4)}...${this.resetToken.substring(this.resetToken.length - 4)}`
        });
        this.isValidToken = true;
      } else {
        console.error('No reset token found in URL or localStorage');
        this.isValidToken = false;
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      this.resetPassword();
    }
  }

  resetPassword() {
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.resetToken) {
      this.errorMessage = 'Reset token not found. Please try the password reset process again.';
      this.isLoading = false;
      return;
    }

    this.authService.resetPassword(this.resetToken, this.changePasswordData.newPassword).subscribe({
      next: (response) => {
        console.log('Password reset successful:', response);
        this.passwordChanged = true;

        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.error('Password reset error:', error);
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  validateForm(): boolean {
    // Check if passwords match
    if (this.changePasswordData.newPassword !== this.changePasswordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return false;
    }

    // Check password strength
    if (this.changePasswordData.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long!';
      return false;
    }

    // Check for strong password
    if (this.getPasswordStrength() === 'weak') {
      this.errorMessage = 'Please choose a stronger password with letters, numbers, and special characters.';
      return false;
    }

    return true;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrength(): 'weak' | 'medium' | 'strong' {
    const password = this.changePasswordData.newPassword;

    if (password.length < 6) {
      return 'weak';
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score++;

    // Contains lowercase
    if (/[a-z]/.test(password)) score++;

    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;

    // Contains numbers
    if (/\d/.test(password)) score++;

    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 'weak':
        return 'Weak - Add more characters, numbers, and symbols';
      case 'medium':
        return 'Medium - Good, but could be stronger';
      case 'strong':
        return 'Strong - Great password!';
      default:
        return '';
    }
  }
}
