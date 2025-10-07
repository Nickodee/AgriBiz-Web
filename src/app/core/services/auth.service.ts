import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RegisterRequest, RegisterResponse, LoginResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;
  private registeredEmailSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  setRegisteredEmail(email: string) {
    this.registeredEmailSubject.next(email);
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Log the response data
        console.log('Login Response:', {
          success: response.success,
          message: response.message,
          userData: response.data
        });

        // Store auth token and user data if they exist
        if (response.data?.token) {
          console.log('Storing auth token and user data');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        // Store email from the response data
        if (response.data?.user?.email) {
          this.registeredEmailSubject.next(response.data.user.email);
        }
      })
    );
  }

  getRegisteredEmail(): string {
    return this.registeredEmailSubject.getValue();
  }

  verifyEmail(otp: string): Observable<any> {
    const email = this.getRegisteredEmail();
    console.log('Verifying email:', { email, otp });

    if (!email) {
      console.error('No email found in registeredEmailSubject');
      throw new Error('Email not found. Please try registering again.');
    }

    // Send email and OTP in the exact format required by the backend
    return this.http.post(`${this.apiUrl}/verify-email`, {
      email,
      otp
    }).pipe(
      tap(
        response => {
          console.log('Verification response:', response);
        },
        error => {
          console.error('Verification error:', error);
        }
      )
    );
  }

  resendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-otp`, { email });
  }

  forgotPassword(email: string): Observable<any> {
    console.log('Sending forgot password request for email:', email);
    return this.http.post<{success: boolean; message: string; data?: {token: string}}>(`${this.apiUrl}/forgot-password`, { email }).pipe(
      tap(response => {
        console.log('Forgot password response:', response);
        // Store reset token if it's in the response
        if (response?.data?.token) {
          console.log('Storing reset token in localStorage:', response.data.token);
          localStorage.setItem('resetToken', response.data.token);
        }
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    // Log the input parameters
    console.log('Resetting password with:', {
      token: token,
      passwordLength: newPassword.length // Don't log the actual password
    });

    const payload = {
      token: token, // Use provided token or get from localStorage
      newPassword: newPassword
    };

    console.log('Sending reset password request with payload:', {
      ...payload,
      newPassword: '[REDACTED]' // Don't log the actual password
    });

    return this.http.post(`${this.apiUrl}/reset-password`, payload).pipe(
      tap(response => {
        console.log('Reset password response:', response);
        // Clear the reset token after successful reset
        localStorage.removeItem('resetToken');
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      oldPassword,
      newPassword,
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {});
  }

  // Helper methods for user role management
  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const role = JSON.parse(user).role;
      // Convert role to lowercase for consistent comparison
      return role ? role.toLowerCase() : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
