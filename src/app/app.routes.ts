import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './core/infra/config/routes.config';
import { HistorialComponent } from './features/historial/infra/components/historial.component';
import { HomeComponent } from './features/home/infra/home.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/infra/components/login/login.component';
import { provideLogin } from './features/login/infra/config/providers';
import { authGuard } from './core/guards/auth.guard';
import { authProtectedGuardGuard } from './core/guards/auth-protected-guard.guard';
import { provideHome } from './features/home/infra/config/provider';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
  {
    path: ROUTE_CONFIG.login,
    component: LoginComponent,
    providers: [provideLogin()],
    canActivate:[authProtectedGuardGuard],
    data: { title: ROUTE_CONFIG.login },
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    providers: [provideLogin()],
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
      },
      {
        providers: [provideHome()],
        path: ROUTE_CONFIG.home,
        component: HomeComponent,
        data: { title: ROUTE_CONFIG.home }

      },
      {
        path: ROUTE_CONFIG.historial,
        component: HistorialComponent,
        data: { title: ROUTE_CONFIG.historial }
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
];
