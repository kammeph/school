import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { AppActions } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      switchMap((action) =>
        this.authService.login(action.email, action.password)
      ),
      map((user) => {
        this.router.navigate(['']);
        return AppActions.loginSuccess({ user });
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.register),
      switchMap((action) =>
        this.authService.register(
          action.displayName,
          action.email,
          action.password
        )
      ),
      map((user) => {
        this.router.navigate(['']);
        return AppActions.loginSuccess({ user });
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logout),
      switchMap(() => this.authService.logout()),
      map(() => {
        this.router.navigate(['/login']);
        return AppActions.logoutSuccess();
      })
    );
  });
}
