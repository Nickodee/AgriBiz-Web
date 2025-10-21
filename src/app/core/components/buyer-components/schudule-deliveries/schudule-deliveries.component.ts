import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DeliverySlot {
  id: number;
  time: string;
  available: boolean;
}

interface DeliverySchedule {
  id: number;
  orderId: string;
  items: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  seller: {
    name: string;
    location: string;
    contact: string;
  };
  deliveryDate: Date;
  selectedSlot?: DeliverySlot;
  status: 'pending' | 'scheduled' | 'in-transit' | 'delivered' | 'cancelled';
  address: string;
  instructions?: string;
  totalItems: number;
}

@Component({
  selector: 'app-schudule-deliveries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schudule-deliveries.component.html',
  styleUrl: './schudule-deliveries.component.css'
})
export class SchuduleDeliveriesComponent {
  selectedDate: string = new Date().toISOString().split('T')[0];
  searchQuery: string = '';
  filterStatus: string = 'all';
  today: string = new Date().toISOString().split('T')[0];

  getDeliveryDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  getCurrentDate(): string {
    return this.today;
  }
  selectedScheduleId: number | null = null;

  timeSlots: DeliverySlot[] = [
    { id: 1, time: '08:00 - 10:00', available: true },
    { id: 2, time: '10:00 - 12:00', available: true },
    { id: 3, time: '12:00 - 14:00', available: false },
    { id: 4, time: '14:00 - 16:00', available: true },
    { id: 5, time: '16:00 - 18:00', available: true }
  ];

  deliverySchedules: DeliverySchedule[] = [
    {
      id: 1,
      orderId: 'ORD-2025-001',
      items: [
        { name: 'Premium Coffee Beans', quantity: 20, unit: 'kg' },
        { name: 'Organic Mixed Vegetables', quantity: 10, unit: 'kg' }
      ],
      seller: {
        name: 'Green Valley Farm',
        location: 'Nyeri, Kenya',
        contact: '+254 712 345 678'
      },
      deliveryDate: new Date('2025-10-22'),
      status: 'pending',
      address: '123 City Centre, Nairobi, Kenya',
      totalItems: 2
    },
    {
      id: 2,
      orderId: 'ORD-2025-002',
      items: [
        { name: 'Fresh Farm Milk', quantity: 50, unit: 'L' }
      ],
      seller: {
        name: 'Dairy Delights',
        location: 'Eldoret, Kenya',
        contact: '+254 723 456 789'
      },
      deliveryDate: new Date('2025-10-23'),
      selectedSlot: { id: 2, time: '10:00 - 12:00', available: true },
      status: 'scheduled',
      address: '456 Industrial Area, Nairobi, Kenya',
      instructions: 'Please call upon arrival',
      totalItems: 1
    }
  ];

  statuses = [
    { value: 'all', label: 'All Deliveries' },
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  getFilteredSchedules() {
    return this.deliverySchedules.filter(schedule => {
      const matchesStatus = this.filterStatus === 'all' || schedule.status === this.filterStatus;
      const matchesSearch =
        schedule.orderId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        schedule.seller.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        schedule.items.some(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));

      return matchesStatus && matchesSearch;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  selectTimeSlot(scheduleId: number, slot: DeliverySlot) {
    if (!slot.available) return;
    const schedule = this.deliverySchedules.find(s => s.id === scheduleId);
    if (schedule) {
      schedule.selectedSlot = slot;
      schedule.status = 'scheduled';
    }
  }

  cancelDelivery(scheduleId: number) {
    const schedule = this.deliverySchedules.find(s => s.id === scheduleId);
    if (schedule && schedule.status === 'pending') {
      schedule.status = 'cancelled';
    }
  }

  updateDeliveryDate(scheduleId: number, event: Event) {
    const newDate = (event.target as HTMLInputElement).value;
    const schedule = this.deliverySchedules.find(s => s.id === scheduleId);
    if (schedule) {
      schedule.deliveryDate = new Date(newDate);
      schedule.selectedSlot = undefined;
      schedule.status = 'pending';
    }
  }

  updateInstructions(scheduleId: number, event: Event) {
    const instructions = (event.target as HTMLTextAreaElement).value;
    const schedule = this.deliverySchedules.find(s => s.id === scheduleId);
    if (schedule) {
      schedule.instructions = instructions;
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-500',
      scheduled: 'bg-blue-500',
      'in-transit': 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  }

  toggleScheduleDetails(scheduleId: number) {
    this.selectedScheduleId = this.selectedScheduleId === scheduleId ? null : scheduleId;
  }
}
