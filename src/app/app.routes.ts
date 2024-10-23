import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import {SignupComponent} from "./auth/components/signup/signup.component";
import {AdminDashboardComponent} from "./admin/components/admin-dashboard.component";
import {CustomerDashboardComponent} from "./customer/components/customer-dashboard.component";
import { BookingComponent } from './admin/booking/booking.component';
import { AddcarComponent } from './admin/addcar/addcar.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import {CustomerLayoutComponent} from "./customer/customer-layout/customer-layout.component";
import {BookingStatusComponent} from "./customer/booking-status/booking-status.component";
import { CarUpdateComponent } from './admin/car-update/car-update.component';

export const routes: Routes = [
    {path: '', redirectTo:'login' ,pathMatch: 'full'},
    {path: 'register' , component: SignupComponent},
    {path: 'login', component: LoginComponent},
    // {path: 'admin', component: AdminDashboardComponent},
    // {path: 'customer', component: CustomerDashboardComponent}
    {
      path: 'login',
      children: [
        {
          path: 'admin',
          component: AdminLayoutComponent,
          children: [
            {path: 'admin-dashboard/update-car/:id', component: CarUpdateComponent},
            {path: 'admin-dashboard', component: AdminDashboardComponent},
            {path: 'booking', component: BookingComponent },
            {path: 'addcar', component: AddcarComponent },
            
          ]
        },
        {
          path: 'customer',
          component: CustomerLayoutComponent,
          children: [
            {path: 'customer-dashboard', component: CustomerDashboardComponent},
            // {path: 'login/customer', redirectTo:'login/customer/customerDashboard', pathMatch:'full'},
            {path: 'booking_status', component: BookingStatusComponent},
          ]
        }
      ]
    }
];
