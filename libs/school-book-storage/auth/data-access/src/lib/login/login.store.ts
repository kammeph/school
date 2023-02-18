import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../service';
import { AuthActions } from '../state';

interface LoginState {
  error: string | null;
  pending: boolean;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  constructor(private authService: AuthService, private store: Store) {
    super({ error: null, pending: false });
  }

  readonly error$ = this.select((state) => state.error);
  readonly pending$ = this.select((state) => state.pending);

  readonly login = this.effect(
    (credentials$: Observable<{ email: string; password: string }>) => {
      return credentials$.pipe(
        tap(() => this.patchState({ pending: true })),
        switchMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            tapResponse(
              (user) => {
                this.setState({ error: null, pending: false });
                this.store.dispatch(AuthActions.loginSuccess({ user }));
              },
              (error: Error) =>
                this.setState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );
}
