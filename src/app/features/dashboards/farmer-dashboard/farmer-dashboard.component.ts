import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerDashboardComponent {
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
    name: 'John Kamau',
    email: 'john.kamau@agribiz.com',
    phone: '+254 712 345 678',
    location: 'Kiambu County, Kenya',
    farmName: 'Kamau Coffee Farm',
    farmSize: '5 hectares',
    crops: ['Coffee', 'Maize', 'Beans'],
    experience: '15 years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    joinedDate: 'March 2022',
    verified: true,
    rating: 4.8,
    totalSales: 156
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
    console.log('Initiating farmer logout...');
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

  // Sample data - replace with actual data from service
  farmStats = {
    totalRevenue: 12450,
    revenueGrowth: 12.5,
    productsListed: 24,
    newProducts: 3,
    activeOrders: 8,
    pendingDeliveries: 2,
    farmHealthScore: 87
  };

  recentOrders = [
    {
      id: 1,
      customer: {
        name: 'Sarah Mwangi',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69e6ac4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      product: 'Coffee Beans - 50kg',
      amount: 850,
      status: 'Delivered',
      statusColor: 'green'
    },
    {
      id: 2,
      customer: {
        name: 'James Ochieng',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      product: 'Organic Vegetables - 20kg',
      amount: 320,
      status: 'Processing',
      statusColor: 'yellow'
    },
    {
      id: 3,
      customer: {
        name: 'Mary Wanjiku',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      product: 'Fresh Fruits - 15kg',
      amount: 245,
      status: 'Pending',
      statusColor: 'blue'
    }
  ];

  farmStatus = {
    weather: {
      condition: 'Sunny, 28°C',
      status: 'Optimal',
      statusColor: 'green'
    },
    soilMoisture: {
      level: '72% optimal',
      status: 'Good',
      statusColor: 'green'
    },
    pestAlert: {
      issue: 'Aphids detected',
      status: 'Action needed',
      statusColor: 'red'
    }
  };

  products = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
      quantity: '50kg available',
      price: 17
    },
    {
      id: 2,
      name: 'Organic Vegetables',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1000&q=80',
      quantity: '30kg available',
      price: 8
    },
    {
      id: 3,
      name: 'Fresh Fruits',
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1000&q=80',
      quantity: '25kg available',
      price: 12
    },
    {
      id: 4,
      name: 'Premium Grains',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80',
      quantity: '100kg available',
      price: 5
    }
  ];
}
