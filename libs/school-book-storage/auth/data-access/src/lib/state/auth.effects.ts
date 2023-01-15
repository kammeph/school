import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.email, action.password)
      ),
      map((user) => {
        this.router.navigate(['']);
        return AuthActions.loginSuccess({ user });
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService.register(
          action.displayName,
          action.email,
          action.password
        )
      ),
      map((user) => {
        this.router.navigate(['']);
        return AuthActions.loginSuccess({ user });
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => {
        this.router.navigate(['/login']);
        return AuthActions.logoutSuccess();
      })
    );
  });
}
