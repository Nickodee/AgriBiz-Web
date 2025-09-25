import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investor-dashboard',
  imports: [CommonModule],
  templateUrl: './investor-dashboard.component.html',
  styleUrl: './investor-dashboard.component.css'
})
export class InvestorDashboardComponent {
  showProfileDropdown = false;

  // Sample investor profile data - in a real app, this would come from a service
  userProfile = {
    name: 'Michael Thompson',
    email: 'michael.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',

    // Investor-specific information
    investorType: 'Individual Investor',
    portfolioValue: '$2,450,000',
    totalInvestments: 45,
    riskTolerance: 'Moderate',
    preferredSectors: ['Agriculture', 'Technology', 'Renewable Energy'],
    experienceLevel: 'Advanced',
    minimumInvestment: '$10,000',
    totalReturns: '$485,000',
    averageROI: '18.5%',
    joinedDate: 'March 2021',

    // Investment preferences
    preferences: {
      geographicFocus: ['East Africa', 'West Africa'],
      investmentHorizon: '3-5 years',
      exitStrategy: 'IPO/Acquisition',
      dueDiligenceLevel: 'Comprehensive'
    },

    // Performance metrics
    performance: {
      successfulExits: 12,
      activeInvestments: 8,
      totalPortfolioGrowth: '24.7%',
      bestPerformingInvestment: 'AgriTech Solutions Ltd'
    }
  };

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  @HostListener('document:click', ['$event'])
  closeProfileDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown-container')) {
      this.showProfileDropdown = false;
    }
  }

  editProfile() {
    console.log('Opening profile edit modal...');
    // Implement profile editing functionality
    // This could open a modal or navigate to an edit page
  }

  openSettings() {
    console.log('Opening investor settings...');
    // Navigate to settings page
  }

  logout() {
    console.log('Logging out investor...');
    // Implement logout functionality
    // Clear session, redirect to login
  }
}
