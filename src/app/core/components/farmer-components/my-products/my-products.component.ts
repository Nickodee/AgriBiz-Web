import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FarmerService } from '../../../services/farmer.service';

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

interface ProductForm {
  quantity: number;
  potatoBreed: string;
  location: string;
  status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'LIMITED';
  imageUrl: string;
  price?: number;
  description?: string;
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
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  // Product Form Data
  productForm: ProductForm = {
    quantity: 0,
    potatoBreed: '',
    location: '',
    status: 'AVAILABLE',
    imageUrl: '',
    price: 0,
    description: ''
  };

  // Available breeds for dropdown
  potatoBreeds = [
    'Dutch Robjin',
    'Shangi',
    'Tigoni',
    'Kenya Mpya',
    'Asante',
    'Purple Gold',
    'Other'
  ];

  // Available locations
  counties = [
    'Kiambu', 'Nairobi', 'Nakuru', 'Nyandarua', 'Meru', 'Bomet',
    'Elgeyo-Marakwet', 'Kericho', 'Kisii', 'Nyamira', 'Trans-Nzoia',
    'Uasin Gishu', 'West Pokot', 'Narok', 'Kajiado'
  ];

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private farmerService: FarmerService
  ) {}

  ngOnInit() {
    this.loadProducts();

    // Check if we should open the modal based on query parameter
    this.route.queryParams.subscribe(params => {
      if (params['openModal'] === 'true') {
        this.openModal();
      }
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.farmerService.getMyProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = [...this.products];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }  openModal() {
    this.isModalOpen = true;
    this.resetForm();
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.productForm = {
      quantity: 0,
      potatoBreed: '',
      location: '',
      status: 'AVAILABLE',
      imageUrl: '',
      price: 0,
      description: ''
    };
    this.imagePreview = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  removeImage() {
    this.imagePreview = null;
    this.selectedFile = null;
    this.productForm.imageUrl = '';
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  async submitProduct() {
    // Validate form
    if (!this.productForm.quantity || this.productForm.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (!this.productForm.potatoBreed) {
      alert('Please select a potato breed');
      return;
    }

    if (!this.productForm.location) {
      alert('Please select a location');
      return;
    }

    if (!this.selectedFile && !this.productForm.imageUrl) {
      alert('Please upload a product image');
      return;
    }

    this.isLoading = true;

    try {
      // Upload image to Cloudinary first if file is selected
      if (this.selectedFile) {
        const imageUrl = await this.uploadImageToCloudinary(this.selectedFile);
        this.productForm.imageUrl = imageUrl;
      }

      // Prepare product data (remove price field as it's not in the API)
      const productData = {
        quantity: this.productForm.quantity,
        potatoBreed: this.productForm.potatoBreed,
        location: this.productForm.location,
        status: this.productForm.status,
        imageUrl: this.productForm.imageUrl
      };

      // Submit product data to backend API
      this.farmerService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.isLoading = false;
          alert('Product added successfully!');
          this.closeModal();
          this.loadProducts(); // Reload products list
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.isLoading = false;
          alert('Failed to add product. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      this.isLoading = false;
    }
  }

  private async uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'potato-platform'); // Replace with your Cloudinary upload preset
    formData.append('folder', 'potato-platform/produce');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dyovxmm4g/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.potatoBreed.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           product.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.selectedStatus || product.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
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
