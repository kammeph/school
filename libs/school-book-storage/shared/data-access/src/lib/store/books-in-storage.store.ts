import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BooksInStorage } from '@school-book-storage/shared-models';
import { Observable, switchMap, tap } from 'rxjs';
import { BooksInStorageService } from '../books-in-storage-service';

type BooksInStorageState = {
  pending: boolean;
  error: string | null;
  success: boolean;
};

@Injectable()
export class BooksInStorageStore extends ComponentStore<BooksInStorageState> {
  constructor(private booksInStorageService: BooksInStorageService) {
    super({ pending: false, error: null, success: false });
  }

  readonly pending$ = this.select((state) => state.pending);
  readonly error$ = this.select((state) => state.error);
  readonly success$ = this.select((state) => state.success);

  readonly set = this.effect(
    (
      data$: Observable<{ schoolId: string; booksInStorage: BooksInStorage }>
    ) => {
      return data$.pipe(
        tap(() =>
          this.patchState({ pending: true, success: false, error: null })
        ),
        switchMap(({ schoolId, booksInStorage }) =>
          this.booksInStorageService.set(schoolId, booksInStorage).pipe(
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

  readonly delete = this.effect(
    (
      data$: Observable<{ schoolId: string; booksInStorage: BooksInStorage }>
    ) => {
      return data$.pipe(
        tap(() =>
          this.patchState({ pending: true, success: false, error: null })
        ),
        switchMap(({ schoolId, booksInStorage }) =>
          this.booksInStorageService.delete(schoolId, booksInStorage).pipe(
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
