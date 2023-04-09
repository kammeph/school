import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  BooksInSchoolClass,
  BooksInStorage,
  Inventory,
} from '@school-book-storage/shared-models';
import { Observable, switchMap, tap } from 'rxjs';
import { InventoryService } from '../service/inventory.service';

type InventoryState = {
  pending: boolean;
  error?: string;
  success: boolean;
};

@Injectable()
export class InventoryStore extends ComponentStore<InventoryState> {
  constructor(private inventorySerrvice: InventoryService) {
    super({ pending: false, error: undefined, success: false });
  }

  readonly pending$ = this.select((state) => state.pending);
  readonly error$ = this.select((state) => state.error);
  readonly success$ = this.select((state) => state.success);

  readonly createInventories = this.effect(
    (data$: Observable<{ schoolId: string; inventories: Inventory[] }>) => {
      return data$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, inventories }) =>
          this.inventorySerrvice.createInventories(schoolId, inventories).pipe(
            tapResponse(
              () => this.patchState({ pending: false, success: true }),
              (error: Error) =>
                this.patchState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );

  readonly executeTransactions = this.effect(
    (
      data$: Observable<{
        schoolId: string;
        booksInStorages: BooksInStorage[];
        booksInSchoolClasses: BooksInSchoolClass[];
      }>
    ) => {
      return data$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, booksInStorages, booksInSchoolClasses }) =>
          this.inventorySerrvice
            .executeTransactions(
              schoolId,
              booksInStorages,
              booksInSchoolClasses
            )
            .pipe(
              tapResponse(
                () => this.patchState({ pending: false, success: true }),
                (error: Error) =>
                  this.patchState({ error: error.message, pending: false })
              )
            )
        )
      );
    }
  );

  readonly markDamagedBooks = this.effect(
    (
      data$: Observable<{
        schoolId: string;
        booksInSchoolClasses: BooksInSchoolClass[];
        damagedBooks: BooksInSchoolClass[];
      }>
    ) => {
      return data$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, booksInSchoolClasses, damagedBooks }) =>
          this.inventorySerrvice
            .markDamagedBooks(schoolId, damagedBooks, booksInSchoolClasses)
            .pipe(
              tapResponse(
                () => this.patchState({ pending: false, success: true }),
                (error: Error) =>
                  this.patchState({ error: error.message, pending: false })
              )
            )
        )
      );
    }
  );
}
