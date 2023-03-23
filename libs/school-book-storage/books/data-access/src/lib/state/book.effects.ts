import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@school-book-storage/auth/data-access';
import { switchMap, map, catchError, of, throwError } from 'rxjs';
import { BookService } from '../service';
import { BookActions } from './book.actions';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.bookService.getBooksBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((books) => BookActions.loadBooksSuccess({ books })),
      catchError((error: Error) =>
        of(BookActions.loadBooksFailure({ error: error.message }))
      )
    );
  });

  authenticationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) => BookActions.loadBooks({ schoolId: user.schoolId }))
    );
  });
}
