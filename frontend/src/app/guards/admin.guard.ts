import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/Auth/auth.service';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';

export const adminGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router= inject(Router);


  return authService.userProfile().pipe(
    map(user => {
      console.log('Usuario:', user);
      console.log('rol', user.rol);
      if (user && user.rol === 'admin'){
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(err => {
      console.error('Error al recuperar el perfil del usuario', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
