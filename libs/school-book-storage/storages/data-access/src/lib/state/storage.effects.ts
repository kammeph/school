import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@school-book-storage/auth/data-access';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { StorageService } from '../service';
import { StorageActions } from './storage.actions';

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storageService: StorageService
  ) {}

  loadStorages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StorageActions.loadStorages),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.storageService.getStoragesBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((storages) => StorageActions.loadStoragesSuccess({ storages })),
      catchError((error: Error) =>
        of(StorageActions.loadStoragesFailure({ error: error.message }))
      )
    );
  });

  authenticationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) =>
        StorageActions.loadStorages({ schoolId: user.schoolId })
      )
    );
  });
}
