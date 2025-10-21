import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {
  isMobileMenuOpen = false;
  isProfileDropdownOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown() {
    this.isProfileDropdownOpen = false;
  }

  // User profile data - replace with actual data from service
  userProfile = {
    name: 'Michael Thompson',
    email: 'michael.thompson@greenvalley.com',
    phone: '+1 (555) 123-4567',
    location: 'Denver, CO',
    companyName: 'Green Valley Grocers',
    businessType: 'Wholesale Distribution',
    preferredProducts: ['Organic Vegetables', 'Dairy Products', 'Coffee', 'Grains'],
    membershipLevel: 'Premium',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    joinedDate: 'January 2022',
    verified: true,
    rating: 4.9,
    totalOrders: 127
  };

  editProfile() {
    // Navigate to profile edit page or open modal
    console.log('Edit profile clicked');
    this.closeProfileDropdown();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    console.log('Initiating logout...');
    this.closeProfileDropdown();

    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        this.authService.clearAuth(); // Clear local storage
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Even if the API call fails, clear local storage and redirect
        this.authService.clearAuth();
        this.router.navigate(['/login']);
      }
    });
  }
}
