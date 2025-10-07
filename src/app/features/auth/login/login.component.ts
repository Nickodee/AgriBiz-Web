import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // If user is already logged in, redirect to appropriate dashboard
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();
      if (userRole) {
        this.router.navigate([`/${userRole}-dashboard`]);
      }
    }
  }

  onSubmit() {
    console.log('Form submitted', this.loginForm.value);

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

      console.log('Attempting login with email:', credentials.email);

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading = false;

          if (response.success && response.data?.user) {
            const userData = response.data;
            const userRole = userData.user.role.toLowerCase();

            console.log('Original user role:', userData.user.role);
            console.log('Normalized user role:', userRole);
            console.log('Auth token stored:', !!userData.token);

            // Navigate based on user role (case-insensitive)
            let targetDashboard: string;
            switch (userRole) {
              case 'buyer':
              case 'BUYER':
                targetDashboard = '/buyer-dashboard';
                break;
              case 'farmer':
              case 'FARMER':
                targetDashboard = '/farmer-dashboard';
                break;
              case 'investor':
              case 'INVESTOR':
                targetDashboard = '/investor-dashboard';
                break;
              case 'admin':
              case 'ADMIN':
                targetDashboard = '/admin-dashboard';
                break;
              default:
                targetDashboard = '/';
            }

            // Check if there's a stored return URL
            const returnUrl = localStorage.getItem('returnUrl');
            console.log('Return URL found:', returnUrl);

            if (returnUrl) {
              localStorage.removeItem('returnUrl'); // Clear the stored URL
              console.log('Navigating to stored URL:', returnUrl);
              this.router.navigateByUrl(returnUrl);
            } else {
              console.log('Navigating to default dashboard:', targetDashboard);
              this.router.navigate([targetDashboard]);
            }
          } else {
            console.error('Login response missing required data:', response);
            this.errorMessage = response.message || 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else if (error.status === 403) {
            this.errorMessage = 'Account not verified. Please verify your email first.';
          } else {
            this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          }
        }
      });
    } else {
      console.log('Form validation failed:', this.loginForm.errors);
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.errors) {
          console.log(`${key} field errors:`, control.errors);
        }
      });
    }
  }
}
