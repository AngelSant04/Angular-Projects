import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  
  if (authService.authStatus() === AuthStatus.authenticated) return true;

  router.navigateByUrl('/auth/login');

  // const url = state.url;
  // localStorage.setItem('url', url);

  return false;
};
