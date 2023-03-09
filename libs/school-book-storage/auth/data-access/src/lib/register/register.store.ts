import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../service';

interface RegisterState {
  error: string | null;
  pending: boolean;
}

@Injectable()
export class RegisterStore extends ComponentStore<RegisterState> {
  constructor(private authService: AuthService, private router: Router) {
    super({ error: null, pending: false });
  }

  readonly pending$ = this.select((state) => state.pending);
  readonly error$ = this.select((state) => state.error);

  readonly register = this.effect(
    (
      registerData$: Observable<{
        displayName: string;
        email: string;
        password: string;
      }>
    ) => {
      return registerData$.pipe(
        tap(() => this.patchState({ pending: true })),
        switchMap(({ displayName, email, password }) => {
          return this.authService.register(displayName, email, password).pipe(
            tapResponse(
              () => {
                this.setState({ error: null, pending: false });
                this.router.navigate(['login']);
              },
              (error: Error) =>
                this.setState({ error: error.message, pending: false })
            )
          );
        })
      );
    }
  );
}
