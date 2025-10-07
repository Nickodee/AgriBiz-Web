import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Check if user has the correct role for the route if needed
      const userRole = this.authService.getUserRole()?.toLowerCase();
      const requiredRole = route.data['requiredRole']?.toLowerCase();

      console.log('Checking roles:', { userRole, requiredRole });

      if (requiredRole && userRole !== requiredRole) {
        console.error('Access denied. Required role:', requiredRole, 'User role:', userRole);

        // Redirect to the appropriate dashboard based on user's role
        if (userRole) {
          this.router.navigate([`/${userRole}-dashboard`]);
        } else {
          this.router.navigate(['/login']);
        }
        return false;
      }

      return true;
    }

    console.log('User not logged in. Redirecting to login page...');
    // Store the attempted URL for redirecting after login
    localStorage.setItem('returnUrl', state.url);
    this.router.navigate(['/login']);
    return false;
  }
}
