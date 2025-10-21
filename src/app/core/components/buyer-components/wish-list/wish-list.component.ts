import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  minOrder: number;
  stock: number;
  seller: {
    name: string;
    rating: number;
    location: string;
  };
  dateAdded: Date;
  organic: boolean;
  category: string;
  description: string;
}

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  searchQuery: string = '';
  sortBy: string = 'dateAdded';
  selectedCategory: string = 'all';

  categories = [
    'All Items',
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Meat',
    'Coffee & Tea',
    'Organic'
  ];

  wishlistItems: WishlistItem[] = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      image: 'https://images.unsplash.com/photo-1587486937303-32eaa2134b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 8.50,
      unit: 'kg',
      minOrder: 10,
      stock: 500,
      seller: {
        name: 'Green Valley Farm',
        rating: 4.8,
        location: 'Nyeri, Kenya'
      },
      dateAdded: new Date('2025-10-15'),
      organic: true,
      category: 'Coffee & Tea',
      description: 'High-altitude Arabica coffee beans, freshly harvested and roasted.'
    },
    {
      id: 2,
      name: 'Organic Mixed Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 4.25,
      unit: 'kg',
      minOrder: 5,
      stock: 100,
      seller: {
        name: 'Fresh Fields Farm',
        rating: 4.9,
        location: 'Nakuru, Kenya'
      },
      dateAdded: new Date('2025-10-10'),
      organic: true,
      category: 'Vegetables',
      description: 'Fresh, seasonal organic vegetables including carrots, tomatoes, and leafy greens.'
    }
  ];

  getFilteredItems() {
    return this.wishlistItems
      .filter(item => {
        const matchesCategory =
          this.selectedCategory.toLowerCase() === 'all items' ||
          (this.selectedCategory.toLowerCase() === 'organic' && item.organic) ||
          item.category.toLowerCase() === this.selectedCategory.toLowerCase();

        const matchesSearch =
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.seller.name.toLowerCase().includes(this.searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch(this.sortBy) {
          case 'priceHigh':
            return b.price - a.price;
          case 'priceLow':
            return a.price - b.price;
          case 'name':
            return a.name.localeCompare(b.name);
          default: // dateAdded
            return b.dateAdded.getTime() - a.dateAdded.getTime();
        }
      });
  }

  removeFromWishlist(itemId: number) {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
  }

  addToCart(item: WishlistItem) {
    console.log('Adding to cart:', item);
    // Implement cart functionality
    this.removeFromWishlist(item.id);
  }

  shareWishlist() {
    console.log('Sharing wishlist...');
    // Implement sharing functionality
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }
}
