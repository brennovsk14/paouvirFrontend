import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {PublicLayoutComponent} from './layouts/public-layout/public-layout.component';
import {PrivateLayoutComponent} from './layouts/private-layout/private-layout.component';
import {ViewLoginComponent} from './views/view-login/view-login.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'login',
        component: ViewLoginComponent,
      }
    ]
  }
];
