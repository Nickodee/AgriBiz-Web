import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get reset token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
      if (this.resetToken) {
        this.validateResetToken();
      } else {
        this.isValidToken = false;
      }
    });
  }

  validateResetToken() {
    // In a real app, you would validate the token with your backend
    // For demo purposes, we'll accept any token that looks valid
    if (this.resetToken && this.resetToken.length > 10) {
      this.isValidToken = true;
      console.log('Validating reset token:', this.resetToken);
    } else {
      this.isValidToken = false;
    }
  }

  onSubmit() {
    if (this.validateForm()) {
      this.changePassword();
    }
  }

  changePassword() {
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call - replace with actual service call
    setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        this.passwordChanged = true;
        this.isLoading = false;
        
        // Here you would make an actual API call to change the password
        console.log('Password changed successfully for token:', this.resetToken);
        
        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Failed to update password. Please try again.';
      }
    }, 2000);
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
