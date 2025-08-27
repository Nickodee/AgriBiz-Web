import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BuyerDashboardComponent } from './features/dashboards/buyer-dashboard/buyer-dashboard.component';
import { InvestorDashboardComponent } from './features/dashboards/investor-dashboard/investor-dashboard.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  { path: 'investor-dashboard', component: InvestorDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];
