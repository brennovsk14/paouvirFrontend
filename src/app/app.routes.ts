import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {PublicLayoutComponent} from './layouts/public-layout/public-layout.component';
import {PrivateLayoutComponent} from './layouts/private-layout/private-layout.component';
import {ViewLoginComponent} from './views/view-login/view-login.component';
import {MenuViewComponent} from './views/menu-view/menu-view.component';
import {BandasViewComponent} from './views/bandas-view/bandas-view.component';
import {AlbunsViewComponent} from './views/albuns-view/albuns-view.component';
import {ViewCadastroComponent} from './views/view-cadastro/view-cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'login',
        component: ViewLoginComponent,
      },
      {
        path: 'cadastro',
        component: ViewCadastroComponent,
      }
    ]
  },

  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'menu',
        component: MenuViewComponent,
      },
      {
        path: 'bandas',
        component: BandasViewComponent,
      },
      {
        path: 'albuns',
        component: AlbunsViewComponent,
      },
    ]
  }
];
