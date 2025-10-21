import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
}

interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  seller: {
    name: string;
    location: string;
    contact: string;
  };
  shippingAddress: string;
  paymentMethod: string;
  totalAmount: number;
  trackingNumber?: string;
  expectedDelivery?: Date;
}

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  selectedStatus: string = 'all';
  searchQuery: string = '';
  sortBy: string = 'newest';

  statusFilters = [
    'all',
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  orders: Order[] = [
    {
      id: 'ORD-2025-001',
      date: new Date('2025-10-15'),
      status: 'processing',
      items: [
        {
          id: 1,
          name: 'Premium Coffee Beans',
          quantity: 20,
          unit: 'kg',
          pricePerUnit: 8.50,
          totalPrice: 170.00
        },
        {
          id: 2,
          name: 'Organic Mixed Vegetables',
          quantity: 10,
          unit: 'kg',
          pricePerUnit: 4.25,
          totalPrice: 42.50
        }
      ],
      seller: {
        name: 'Green Valley Farm',
        location: 'Nyeri, Kenya',
        contact: '+254 712 345 678'
      },
      shippingAddress: '123 City Centre, Nairobi, Kenya',
      paymentMethod: 'M-PESA',
      totalAmount: 212.50,
      trackingNumber: 'TRK-12345',
      expectedDelivery: new Date('2025-10-22')
    },
    {
      id: 'ORD-2025-002',
      date: new Date('2025-10-10'),
      status: 'delivered',
      items: [
        {
          id: 3,
          name: 'Fresh Farm Milk',
          quantity: 50,
          unit: 'L',
          pricePerUnit: 1.50,
          totalPrice: 75.00
        }
      ],
      seller: {
        name: 'Dairy Delights',
        location: 'Eldoret, Kenya',
        contact: '+254 723 456 789'
      },
      shippingAddress: '456 Industrial Area, Nairobi, Kenya',
      paymentMethod: 'Bank Transfer',
      totalAmount: 75.00
    }
  ];

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: '#ffa500',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#2ecc71',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#666';
  }

  getFilteredOrders() {
    return this.orders.filter(order => {
      const matchesStatus = this.selectedStatus === 'all' || order.status === this.selectedStatus;
      const matchesSearch = order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          order.items.some(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    }).sort((a, b) => {
      if (this.sortBy === 'newest') {
        return b.date.getTime() - a.date.getTime();
      } else {
        return a.date.getTime() - b.date.getTime();
      }
    });
  }

  cancelOrder(orderId: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order && order.status === 'pending') {
      order.status = 'cancelled';
      // Implement actual cancellation logic here
      console.log('Order cancelled:', orderId);
    }
  }

  reorderItems(order: Order) {
    // Implement reorder logic here
    console.log('Reordering items from order:', order.id);
  }

  trackOrder(trackingNumber: string) {
    // Implement tracking logic here
    console.log('Tracking order:', trackingNumber);
  }

  downloadInvoice(orderId: string) {
    // Implement invoice download logic here
    console.log('Downloading invoice for order:', orderId);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
