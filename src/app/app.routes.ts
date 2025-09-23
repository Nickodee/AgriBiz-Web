import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BuyerDashboardComponent } from './features/dashboards/buyer-dashboard/buyer-dashboard.component';
import { InvestorDashboardComponent } from './features/dashboards/investor-dashboard/investor-dashboard.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { FarmerDashboardComponent } from './features/dashboards/farmer-dashboard/farmer-dashboard.component';
import { BuyerComponent } from './features/auth/register-components/buyer/buyer.component';
import { InvestorComponent } from './features/auth/register-components/investor/investor.component';
import { FarmerComponent } from './features/auth/register-components/farmer/farmer.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  { path: 'investor-dashboard', component: InvestorDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'farmer-dashboard', component: FarmerDashboardComponent },
  { path: 'buyer-register', component: BuyerComponent },
  { path: 'investor-register', component: InvestorComponent },
  { path: 'farmer-register', component: FarmerComponent }
];
