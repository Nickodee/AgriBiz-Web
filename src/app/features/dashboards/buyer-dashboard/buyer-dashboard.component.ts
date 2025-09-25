import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  logout() {
    // Implement logout functionality
    console.log('Logout clicked');
    this.closeProfileDropdown();
  }
}
