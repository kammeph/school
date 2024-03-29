import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Book } from '@school-book-storage/shared-models';
import { Observable, switchMap, tap } from 'rxjs';
import { BookService } from '../service';

type BooksState = {
  error?: string;
  pending: boolean;
  success: boolean;
};

@Injectable()
export class BookStore extends ComponentStore<BooksState> {
  constructor(private bookService: BookService) {
    super({
      error: undefined,
      pending: false,
      success: false,
    });
  }

  readonly error$ = this.select((state) => state.error);
  readonly pending$ = this.select((state) => state.pending);
  readonly success$ = this.select((state) => state.success);

  readonly create = this.effect(
    (triggers$: Observable<{ schoolId: string; book: Book }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, book }) =>
          this.bookService.create(schoolId, book).pipe(
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

  readonly update = this.effect(
    (
      triggers$: Observable<{ schoolId: string; bookId: string; book: Book }>
    ) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, bookId, book }) =>
          this.bookService.update(schoolId, bookId, book).pipe(
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
    (triggers$: Observable<{ schoolId: string; bookId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, bookId }) =>
          this.bookService.delete(schoolId, bookId).pipe(
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
