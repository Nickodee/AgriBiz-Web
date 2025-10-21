import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  minOrder: number;
  seller: {
    name: string;
    rating: number;
    location: string;
    avatar: string;
  };
  image: string;
  organic: boolean;
  stock: number;
  description: string;
}

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent {
  selectedCategory: string = 'all';
  searchQuery: string = '';
  sortBy: string = 'recommended';

  categories = [
    'All Products',
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Meat',
    'Coffee & Tea',
    'Organic'
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      category: 'Coffee & Tea',
      price: 8.50,
      unit: 'kg',
      minOrder: 10,
      seller: {
        name: 'Green Valley Farm',
        rating: 4.8,
        location: 'Nyeri, Kenya',
        avatar: 'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
      },
      image: 'https://images.unsplash.com/photo-1587486937303-32eaa2134b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      organic: true,
      stock: 500,
      description: 'High-altitude Arabica coffee beans, freshly harvested and roasted.'
    },
    {
      id: 2,
      name: 'Organic Mixed Vegetables',
      category: 'Vegetables',
      price: 4.25,
      unit: 'kg',
      minOrder: 5,
      seller: {
        name: 'Fresh Fields Farm',
        rating: 4.9,
        location: 'Nakuru, Kenya',
        avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
      },
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      organic: true,
      stock: 100,
      description: 'Fresh, seasonal organic vegetables including carrots, tomatoes, and leafy greens.'
    },
    {
      id: 3,
      name: 'Fresh Farm Milk',
      category: 'Dairy',
      price: 1.50,
      unit: 'L',
      minOrder: 20,
      seller: {
        name: 'Dairy Delights',
        rating: 4.7,
        location: 'Eldoret, Kenya',
        avatar: 'https://images.unsplash.com/photo-1546456073-92b9f0a8d413?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
      },
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      organic: true,
      stock: 200,
      description: 'Fresh, pasteurized whole milk from grass-fed cows.'
    }
  ];

  filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesCategory = this.selectedCategory.toLowerCase() === 'all products' ||
                            product.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  setSortBy(sort: string) {
    this.sortBy = sort;
  }

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    // Implement cart functionality
  }

  addToWishlist(product: Product) {
    console.log('Adding to wishlist:', product);
    // Implement wishlist functionality
  }
}
