import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTE_CONFIG } from '../infra/config/routes.config';

export const authProtectedGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true; 
  } else {
        router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
  return false
  }
}
