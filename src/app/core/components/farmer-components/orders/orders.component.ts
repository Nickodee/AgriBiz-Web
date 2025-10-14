import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  searchQuery = '';
  selectedStatus = '';
  selectedDate = '';
  selectedOrder: Order | null = null;
  isLoading = false;

  orders: Order[] = [
    {
      id: 1,
      orderNumber: 'ORD-2025-001',
      customerName: 'Sarah Mwangi',
      customerEmail: 'sarah.mwangi@example.com',
      customerAvatar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
      amount: 850,
      status: 'delivered',
      date: new Date('2025-10-01'),
      items: [
        {
          id: 1,
          name: 'Premium Coffee Beans',
          image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
          quantity: 50,
          price: 17
        }
      ],
      subtotal: 800,
      shipping: 50
    },
    {
      id: 2,
      orderNumber: 'ORD-2025-002',
      customerName: 'James Ochieng',
      customerEmail: 'james.ochieng@example.com',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      amount: 320,
      status: 'processing',
      date: new Date('2025-10-05'),
      items: [
        {
          id: 2,
          name: 'Organic Vegetables',
          image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=300&q=80',
          quantity: 40,
          price: 8
        }
      ],
      subtotal: 300,
      shipping: 20
    },
    {
      id: 3,
      orderNumber: 'ORD-2025-003',
      customerName: 'Mary Wanjiku',
      customerEmail: 'mary.wanjiku@example.com',
      customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      amount: 245,
      status: 'pending',
      date: new Date('2025-10-08'),
      items: [
        {
          id: 3,
          name: 'Fresh Fruits',
          image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300&q=80',
          quantity: 20,
          price: 12
        }
      ],
      subtotal: 230,
      shipping: 15
    }
  ];

  get filteredOrders(): Order[] {
    return this.orders.filter(order => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.selectedStatus || order.status === this.selectedStatus;

      let matchesDate = true;
      if (this.selectedDate) {
        const orderDate = new Date(order.date);
        const now = new Date();

        switch (this.selectedDate) {
          case 'today':
            matchesDate = orderDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            matchesDate = orderDate >= weekAgo;
            break;
          case 'month':
            matchesDate = orderDate.getMonth() === now.getMonth() &&
                         orderDate.getFullYear() === now.getFullYear();
            break;
          case 'year':
            matchesDate = orderDate.getFullYear() === now.getFullYear();
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  openOrderDetails(order: Order) {
    this.selectedOrder = order;
  }

  exportOrders() {
    // Implement export functionality
    console.log('Exporting orders...');
  }
}
