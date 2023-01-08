import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { selectIsLoggedIn } from '../../state/app.selectors';

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
    return this.store.select(selectIsLoggedIn).pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return route.routeConfig?.path !== 'login';
        }
        return route.routeConfig?.path === 'login';
      }),
      tap((canActivate) => {
        if (route.routeConfig?.path !== 'login' && !canActivate) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
