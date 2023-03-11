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

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap(() => this.router.navigate(['app']))
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => {
        this.router.navigate(['login']);
        return AuthActions.logoutSuccess();
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changePassword),
      switchMap(({ newPassword }) =>
        this.authService.changePassword(newPassword).pipe(
          map(() => AuthActions.changePasswordSuccess()),
          catchError((error: Error) =>
            of(AuthActions.changePasswordFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
