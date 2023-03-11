import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectIsAdmin,
  selectIsLoggedIn,
} from '@school-book-storage/auth/data-access';
import { map, Observable, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select(selectIsLoggedIn)
      .pipe(withLatestFrom(this.store.select(selectIsAdmin)))
      .pipe(
        map(([isLoggedIn, isAdmin]) => {
          switch (route.routeConfig?.path) {
            case 'app':
              return isLoggedIn;
            case 'admin':
              return isLoggedIn && isAdmin;
            case 'login':
              return !isLoggedIn;
            default:
              return false;
          }
        }),
        tap((canActivate) => {
          if (route.routeConfig?.path !== 'login' && !canActivate) {
            this.router.navigate(['/login']);
          }
          if (route.routeConfig?.path === 'admin' && !canActivate) {
            this.router.navigate(['/app']);
          }
        })
      );
  }
}
