import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { BooksInSchoolClass } from '@school-book-storage/shared-models';
import { Observable, tap, switchMap } from 'rxjs';
import { BooksInSchoolClassService } from '../books-in-school-class-service';

type BooksInSchoolClassState = {
  pending: boolean;
  error: string | null;
  success: boolean;
};

@Injectable()
export class BooksInSchoolClassStore extends ComponentStore<BooksInSchoolClassState> {
  constructor(private booksInSchoolClassService: BooksInSchoolClassService) {
    super({ pending: false, error: null, success: false });
  }

  readonly pending$ = this.select((state) => state.pending);
  readonly error$ = this.select((state) => state.error);
  readonly success$ = this.select((state) => state.success);

  readonly set = this.effect(
    (
      data$: Observable<{
        schoolId: string;
        booksInSchoolClass: BooksInSchoolClass;
      }>
    ) => {
      return data$.pipe(
        tap(() =>
          this.patchState({ pending: true, success: false, error: null })
        ),
        switchMap(({ schoolId, booksInSchoolClass }) =>
          this.booksInSchoolClassService.set(schoolId, booksInSchoolClass).pipe(
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
      data$: Observable<{
        schoolId: string;
        booksInSchoolClass: BooksInSchoolClass;
      }>
    ) => {
      return data$.pipe(
        tap(() =>
          this.patchState({ pending: true, success: false, error: null })
        ),
        switchMap(({ schoolId, booksInSchoolClass }) =>
          this.booksInSchoolClassService
            .delete(schoolId, booksInSchoolClass)
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
