import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@school-book-storage/auth/data-access';
import { catchError, map, of, switchMap, throwError } from 'rxjs';
import { InventoryService } from '../service/inventory.service';
import { InventoryActions } from './inventory.actions';

@Injectable()
export class InventoryEffects {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService
  ) {}

  loadInventories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.loadInventories),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.inventoryService.getInventoriesBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((inventories) =>
        InventoryActions.loadInventoriesSuccess({ inventories })
      ),
      catchError((error: Error) =>
        of(InventoryActions.loadInventoriesFailure({ error: error.message }))
      )
    );
  });

  loadBooksInStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.loadBooksInStorage),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.inventoryService.getBooksInStoragesBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((booksInStorage) =>
        InventoryActions.loadBooksInStorageSuccess({ booksInStorage })
      ),
      catchError((error: Error) =>
        of(InventoryActions.loadBooksInStorageFailure({ error: error.message }))
      )
    );
  });

  authenticationSuccessLoadBooksInStorages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) =>
        InventoryActions.loadBooksInStorage({ schoolId: user.schoolId })
      )
    );
  });

  loadBooksInSchoolClass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.loadBooksInSchoolClass),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.inventoryService.getBooksInSchoolClassesBySchool(
            schoolId
          );
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((booksInSchoolClass) =>
        InventoryActions.loadBooksInSchoolClassSuccess({ booksInSchoolClass })
      ),
      catchError((error: Error) =>
        of(
          InventoryActions.loadBooksInSchoolClassFailure({
            error: error.message,
          })
        )
      )
    );
  });

  authenticationSuccessLoadBooksInSchoolClass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) =>
        InventoryActions.loadBooksInSchoolClass({ schoolId: user.schoolId })
      )
    );
  });

  loadDamagedBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InventoryActions.loadDamagedBooks),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.inventoryService.getDamagedBooksBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((damagedBooks) =>
        InventoryActions.loadDamagedBooksSuccess({ damagedBooks })
      ),
      catchError((error: Error) =>
        of(
          InventoryActions.loadDamagedBooksFailure({
            error: error.message,
          })
        )
      )
    );
  });

  authenticationSuccessLoadDamagedBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) =>
        InventoryActions.loadDamagedBooks({ schoolId: user.schoolId })
      )
    );
  });
}
