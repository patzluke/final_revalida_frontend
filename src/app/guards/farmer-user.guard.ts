import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const farmerUserGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userType = localStorage.getItem('userType');
  const isActive = localStorage.getItem('isActive');

  if (userType == 'Farmer' && isLoggedIn == 'true' && isActive == 'true') {
    return true;
  }
  const _router = inject(Router);
  _router.navigateByUrl('/login');
  return false;
};
