import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const preventAccess: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userType = localStorage.getItem('userType');
  const isActive = localStorage.getItem('isActive');

  const _router = inject(Router);

  if (userType == 'Administrator' && isLoggedIn == 'true' && isActive == 'true') {
    _router.navigateByUrl('/administrator/farmingtips');
    return false;
  } else if (
    userType == 'Supplier' &&
    isLoggedIn == 'true' &&
    isActive == 'true'
  ) {
    _router.navigateByUrl('/supplier/post-advertisement-list');
  } else if (
    userType == 'Farmer' &&
    isLoggedIn == 'true' &&
    isActive == 'true'
  ) {
    _router.navigateByUrl('/farmer/crop-advertisements');
  }

  return true;
};
