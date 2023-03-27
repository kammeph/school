import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '@school-book-storage/auth/data-access';
import { switchMap, throwError, map, catchError, of } from 'rxjs';
import { SchoolClassService } from '../service';
import { SchoolClassActions } from './school-class.actions';

@Injectable()
export class SchoolClassEffects {
  constructor(
    private actions$: Actions,
    private schoolClassService: SchoolClassService
  ) {}

  loadSchoolClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolClassActions.loadSchoolClasses),
      switchMap(({ schoolId }) => {
        if (schoolId) {
          return this.schoolClassService.getAllBySchool(schoolId);
        }
        return throwError(() => new Error('User not assigned to a school'));
      }),
      map((schoolClasses) =>
        SchoolClassActions.loadSchoolClassesSuccess({ schoolClasses })
      ),
      catchError((error: Error) =>
        of(
          SchoolClassActions.loadSchoolClassesFailure({ error: error.message })
        )
      )
    );
  });

  authenticationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authenticationSuccess),
      map(({ user }) =>
        SchoolClassActions.loadSchoolClasses({ schoolId: user.schoolId })
      )
    );
  });
}
