import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FarmerService } from '../../../services/farmer.service';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
  nationalId: string | null;
  address: string | null;
  phoneNumber: string | null;
  bio: string | null;
}

interface Product {
  id: number;
  quantity: number;
  potatoBreed: string;
  location: string;
  status: string;
  imageUrl: string;
  farmerName: string;
  farmerPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: UserData | null = null;
  products: Product[] = [];
  isLoadingProducts = false;
  productsError: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private farmerService: FarmerService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadProducts();
  }

  private loadUserData() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.userData = JSON.parse(userString);
    }
  }

  loadProducts() {
    console.log('Dashboard - Starting to load products...');
    this.isLoadingProducts = true;
    this.productsError = null;

    this.farmerService.getMyProducts().subscribe({
      next: (response) => {
        console.log('Dashboard - Products received:', response);
        console.log('Dashboard - Number of products:', response?.length || 0);
        console.log('Dashboard - First product:', response?.[0]);
        this.products = response;
        this.isLoadingProducts = false;
        console.log('Dashboard - Products array updated:', this.products);
      },
      error: (error) => {
        console.error('Dashboard - Error fetching products:', error);
        console.error('Dashboard - Error status:', error.status);
        console.error('Dashboard - Error message:', error.message);
        console.error('Dashboard - Full error:', error);
        this.productsError = 'Failed to load products. Please try again later.';
        this.isLoadingProducts = false;
      }
    });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80';
  }

  navigateToAddProduct() {
    // Navigate to my-products page with a flag to open the modal
    this.router.navigate(['/farmer-home/my-products'], {
      queryParams: { openModal: 'true' }
    });
  }

  navigateToAnalytics() {
    this.router.navigate(['/farmer-home/analytics']);
  }

  navigateToSupport() {
    this.router.navigate(['/farmer-home/support']);
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'LIMITED':
        return 'bg-yellow-100 text-yellow-800';
      case 'OUT_OF_STOCK':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatStatus(status: string): string {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
