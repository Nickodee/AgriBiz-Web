import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// Auth Components
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { EmailVerificationComponent } from './features/auth/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { BuyerComponent } from './features/auth/register-components/buyer/buyer.component';
import { InvestorComponent } from './features/auth/register-components/investor/investor.component';
import { FarmerComponent } from './features/auth/register-components/farmer/farmer.component';

// Dashboard Components
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { BuyerDashboardComponent } from './features/dashboards/buyer-dashboard/buyer-dashboard.component';
import { InvestorDashboardComponent } from './features/dashboards/investor-dashboard/investor-dashboard.component';
import { FarmerDashboardComponent } from './features/dashboards/farmer-dashboard/farmer-dashboard.component';

// Farmer Components
import { MyProductsComponent } from './core/components/farmer-components/my-products/my-products.component';
import { OrdersComponent } from './core/components/farmer-components/orders/orders.component';
import { AnalyticsComponent } from './core/components/farmer-components/analytics/analytics.component';
import { FarmScheduleComponent } from './core/components/farmer-components/farm-schedule/farm-schedule.component';
import { FarmHealthComponent } from './core/components/farmer-components/farm-health/farm-health.component';
import { MessagesComponent } from './core/components/farmer-components/messages/messages.component';
import { SettingsComponent } from './core/components/farmer-components/settings/settings.component';

// Buyer Components
import { BuyerDashComponent } from './core/components/buyer-components/buyer-dash/buyer-dash.component';
import { MarketplaceComponent } from './core/components/buyer-components/marketplace/marketplace.component';
import { MyOrdersComponent } from './core/components/buyer-components/my-orders/my-orders.component';
import { SchuduleDeliveriesComponent } from './core/components/buyer-components/schudule-deliveries/schudule-deliveries.component';
import { WishListComponent } from './core/components/buyer-components/wish-list/wish-list.component';
import { MessagesComponent as BuyerMessagesComponent } from './core/components/buyer-components/messages/messages.component';

// Landing and Home Components
import { LandingLayoutComponent } from './core/landing-layout/landing-layout.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { FarmersHomeComponent } from './features/home/farmers-home/farmers-home.component';
import { BuyersHomeComponent } from './features/home/buyers-home/buyers-home.component';
import { InvestorsHomeComponent } from './features/home/investors-home/investors-home.component';
import { DashboardComponent } from './core/components/farmer-components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'farmers', component: FarmersHomeComponent },
      { path: 'buyers', component: BuyersHomeComponent },
      { path: 'investors', component: InvestorsHomeComponent }
    ]
  },

  // Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'buyer-register', component: BuyerComponent },
  { path: 'investor-register', component: InvestorComponent },
  { path: 'farmer-register', component: FarmerComponent },

  // Dashboard Routes
  {
    path: 'buyer-dashboard',
    component: BuyerDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'buyer' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dash' },
      { path: 'dash', component: BuyerDashComponent },
      { path: 'marketplace', component: MarketplaceComponent },
      { path: 'orders', component: MyOrdersComponent },
      { path: 'deliveries', component: SchuduleDeliveriesComponent },
      { path: 'wishlist', component: WishListComponent },
      { path: 'messages', component: BuyerMessagesComponent }
    ]
  },
  {
    path: 'investor-dashboard',
    component: InvestorDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'investor' }
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'admin' }
  },
  {
    path: 'farmer-dashboard',
    component: FarmerDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'farmer' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-products', component: MyProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'farm-schedule', component: FarmScheduleComponent },
      { path: 'farm-health', component: FarmHealthComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
