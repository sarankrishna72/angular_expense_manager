import { AuthorizationService } from './../services/authorization/authorization.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router: any = inject(Router);
  if (!inject(AuthorizationService).isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  } else {
    if (route.routeConfig.path == 'login') {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};
