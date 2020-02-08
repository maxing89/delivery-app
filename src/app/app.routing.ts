import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MenuComponent } from './components/shared/menu/menu.component';

import { AuthenticatedUserGuard } from './guards/authenticated-user';

const routes: Routes = [
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent },
    ],
  },
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: '', component: MenuComponent, outlet: 'menu' }
    ],
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: 'delivery',
    children: [
      { path: '', component: DeliveryComponent },
      { path: ':id', component: DeliveryComponent },
      { path: '', component: MenuComponent, outlet: 'menu' }
    ],
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

export const routing = RouterModule.forRoot(routes);
