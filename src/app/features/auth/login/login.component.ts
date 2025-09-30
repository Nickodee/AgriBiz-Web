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

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.success && response.data) {
            const userData = response.data;

            // Navigate based on user role
            switch (userData.user.role.toLowerCase()) {
              case 'buyer':
                this.router.navigate(['/buyer-dashboard']);
                break;
              case 'farmer':
                this.router.navigate(['/farmer-dashboard']);
                break;
              case 'investor':
                this.router.navigate(['/investor-dashboard']);
                break;
              case 'admin':
                this.router.navigate(['/admin-dashboard']);
                break;
              default:
                this.router.navigate(['/']);
            }
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
