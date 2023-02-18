import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

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
      }),
      catchError((error) => {
        return of(AuthActions.registerFailure({ error: error?.message }));
      })
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['']))
      );
    },
    { dispatch: false }
  );

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
