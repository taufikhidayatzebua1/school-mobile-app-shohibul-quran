import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  
  console.log('[AuthGuard] Checking authentication:', {
    isAuthenticated,
    hasToken: !!authService.getToken(),
    hasUser: !!authService.currentUserValue,
    url: state.url
  });

  if (isAuthenticated) {
    return true;
  }

  // Not authenticated, redirect to login with return url
  console.log('[AuthGuard] User not authenticated, redirecting to login');
  router.navigate(['/login'], { queryParams: { returnUrl: state.url }, replaceUrl: true });
  return false;
};
