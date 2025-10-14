import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: string;
  price: number;
  category: string;
  status: 'inStock' | 'lowStock' | 'outOfStock';
}

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {
  isModalOpen = false;
  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';
  isLoading = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
      quantity: '50kg available',
      price: 17,
      category: 'coffee',
      status: 'inStock'
    },
    {
      id: 2,
      name: 'Organic Vegetables',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1000&q=80',
      quantity: '30kg available',
      price: 8,
      category: 'vegetables',
      status: 'lowStock'
    },
    {
      id: 3,
      name: 'Fresh Fruits',
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1000&q=80',
      quantity: '25kg available',
      price: 12,
      category: 'fruits',
      status: 'inStock'
    },
    {
      id: 4,
      name: 'Premium Grains',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80',
      quantity: '100kg available',
      price: 5,
      category: 'grains',
      status: 'inStock'
    }
  ];

  filteredProducts: Product[] = [];

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.applyFilters();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  applyFilters() {
    this.isLoading = true;

    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || product.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Simulate loading state
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  onSearchChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onCategoryChange(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onStatusChange(event: Event) {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== id);
      this.applyFilters();
    }
  }

  editProduct(product: Product) {
    // Implement edit functionality
    console.log('Editing product:', product);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'inStock':
        return 'text-green-600';
      case 'lowStock':
        return 'text-yellow-600';
      case 'outOfStock':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
  // Sample data - replace with actual data from service


}
