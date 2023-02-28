import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { User } from '@school-book-storage/auth/data-access';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UserService } from '../service/user.service';

interface UserState {
  users: User[] | null;
  user: User | null;
  pending: boolean;
  error: string | null;
  success: boolean;
}

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  constructor(private userService: UserService) {
    super({
      users: null,
      user: null,
      pending: false,
      error: null,
      success: false,
    });
  }

  readonly users$ = this.select((state) => state.users);
  readonly user$ = this.select((state) => state.user);
  readonly error$ = this.select((state) => state.error);
  readonly success$ = this.select((state) => state.success);

  readonly getAll = this.effect<void>((triggers$) => {
    return triggers$.pipe(
      tap(() => this.patchState({ pending: true, success: false })),
      switchMap(() =>
        this.userService.getAll().pipe(
          distinctUntilChanged(),
          tapResponse(
            (users) =>
              this.patchState({ users, pending: false, success: false }),
            (error: Error) =>
              this.patchState({
                users: null,
                error: error.message,
                pending: false,
              })
          )
        )
      )
    );
  });

  readonly getById = this.effect<string>((uid$) => {
    return uid$.pipe(
      tap(() => this.patchState({ pending: true, success: false })),
      switchMap((uid) =>
        this.userService.getById(uid).pipe(
          tapResponse(
            (user) => this.patchState({ user, pending: false, success: false }),
            (error: Error) =>
              this.patchState({
                user: null,
                error: error.message,
                pending: false,
              })
          )
        )
      )
    );
  });

  readonly update = this.effect<User>((user$) => {
    return user$.pipe(
      tap(() => this.patchState({ pending: true })),
      switchMap((user) =>
        this.userService.update(user).pipe(
          tapResponse(
            () => this.patchState({ success: true, pending: false }),
            (error: Error) =>
              this.patchState({
                error: error.message,
                pending: false,
              })
          )
        )
      )
    );
  });
}
