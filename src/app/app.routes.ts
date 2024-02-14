import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  }, {
    path: 'login',
    component: AuthenticationComponent,
    pathMatch: 'full'
  }
];
