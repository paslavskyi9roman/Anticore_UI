import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth-service.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  return router.parseUrl('/admin/login');
};
