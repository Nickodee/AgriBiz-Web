import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { ChartConfiguration } from 'chart.js';

// Dynamically import Chart.js only in browser environment
let Chart: any;

interface Metrics {
  revenue: number;
  revenueChange: number;
  orders: number;
  ordersChange: number;
  products: number;
  productsChange: number;
  customers: number;
  customersChange: number;
}

interface TopProduct {
  name: string;
  sku: string;
  image: string;
  unitsSold: number;
  revenue: number;
  growth: number;
}

interface CustomerActivity {
  customerName: string;
  customerAvatar: string;
  action: string;
  time: Date;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart') revenueChart!: ElementRef;
  @ViewChild('ordersChart') ordersChart!: ElementRef;

  selectedRange = 'month';
  isLoading = false;

  metrics: Metrics = {
    revenue: 158750,
    revenueChange: 12.5,
    orders: 245,
    ordersChange: 8.3,
    products: 48,
    productsChange: 4.2,
    customers: 185,
    customersChange: 15.7
  };

  topProducts: TopProduct[] = [
    {
      name: 'Premium Coffee Beans',
      sku: 'COF-001',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
      unitsSold: 1250,
      revenue: 21250,
      growth: 23.5
    },
    {
      name: 'Organic Vegetables Mix',
      sku: 'VEG-002',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=300&q=80',
      unitsSold: 850,
      revenue: 15300,
      growth: 15.2
    },
    {
      name: 'Fresh Fruits Pack',
      sku: 'FRU-003',
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=300&q=80',
      unitsSold: 720,
      revenue: 12960,
      growth: -2.8
    }
  ];

  customerActivity: CustomerActivity[] = [
    {
      customerName: 'Sarah Mwangi',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b69e6ac4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      action: 'Placed a new order of Premium Coffee Beans',
      time: new Date('2025-10-14T09:30:00')
    },
    {
      customerName: 'James Ochieng',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      action: 'Left a 5-star review for Organic Vegetables Mix',
      time: new Date('2025-10-14T08:45:00')
    },
    {
      customerName: 'Mary Wanjiku',
      customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      action: 'Subscribed to monthly Fresh Fruits Pack delivery',
      time: new Date('2025-10-14T08:15:00')
    }
  ];

  private revenueChartInstance: any = null;
  private ordersChartInstance: any = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.updateData();
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      const { Chart } = await import('chart.js/auto');
      await this.initializeCharts(Chart);
    }
  }

  updateData() {
    this.isLoading = true;
    // Simulated API call delay
    setTimeout(() => {
      this.updateCharts();
      this.isLoading = false;
    }, 500);
  }

  private async initializeCharts(ChartJS: any) {
    if (!this.isBrowser) return;

    // Revenue Chart
    const revenueCtx = this.revenueChart.nativeElement.getContext('2d');
    this.revenueChartInstance = new ChartJS(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Revenue',
          data: [35000, 42000, 38000, 43750],
          borderColor: '#10B981',
          tension: 0.3,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(this: any, value: number | string): string {
                return `KES ${Number(value).toLocaleString()}`;
              }
            }
          }
        }
      }
    });

    // Orders Chart
    const ordersCtx = this.ordersChart.nativeElement.getContext('2d');
    this.ordersChartInstance = new ChartJS(ordersCtx, {
      type: 'bar',
      data: {
        labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        datasets: [{
          label: 'Orders',
          data: [45, 62, 58, 75, 5],
          backgroundColor: [
            '#FCD34D',
            '#60A5FA',
            '#A78BFA',
            '#34D399',
            '#F87171'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    });
  }

  private updateCharts() {
    if (this.revenueChartInstance && this.ordersChartInstance) {
      // Update chart data based on selected range
      // This would normally fetch new data from an API
      this.revenueChartInstance.update();
      this.ordersChartInstance.update();
    }
  }
}
