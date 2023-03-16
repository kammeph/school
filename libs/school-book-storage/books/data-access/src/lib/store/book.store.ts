import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Book } from '../models';
import { BookService } from '../service';

interface BooksState {
  books: Book[];
  book?: Book;
  error?: string;
  pending: boolean;
  success: boolean;
}

@Injectable()
export class BookStore extends ComponentStore<BooksState> {
  constructor(private bookService: BookService) {
    super({
      books: [],
      book: undefined,
      error: undefined,
      pending: false,
      success: false,
    });
  }

  readonly books$ = this.select((state) => state.books);
  readonly book$ = this.select((state) => state.book);
  readonly error$ = this.select((state) => state.error);
  readonly pending$ = this.select((state) => state.pending);
  readonly success$ = this.select((state) => state.success);

  readonly getAll = this.effect((schoolId$: Observable<string | undefined>) => {
    return schoolId$.pipe(
      tap(() => this.patchState({ pending: true, success: false })),
      switchMap((schoolId) =>
        this.bookService.getBooksBySchool(schoolId).pipe(
          tapResponse(
            (books) =>
              this.patchState({ books, pending: false, success: false }),
            (error: Error) =>
              this.patchState({ error: error.message, pending: false })
          )
        )
      )
    );
  });

  readonly getById = this.effect(
    (triggers$: Observable<{ schoolId: string; bookId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, bookId }) =>
          this.bookService.getById(schoolId, bookId).pipe(
            tapResponse(
              (book) =>
                this.patchState({ book, pending: false, success: false }),
              (error: Error) =>
                this.patchState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );

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
