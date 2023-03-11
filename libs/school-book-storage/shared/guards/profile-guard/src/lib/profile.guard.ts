import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUid } from '@school-book-storage/auth/data-access';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectUid).pipe(
      map((uid) => {
        return uid === route.paramMap.get('id');
      })
    );
  }
}
