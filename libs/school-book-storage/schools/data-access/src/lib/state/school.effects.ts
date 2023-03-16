import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SchoolService } from '../service';
import { SchoolActions } from './school.actions';

@Injectable()
export class SchoolEffects {
  constructor(
    private actions$: Actions,
    private schoolService: SchoolService
  ) {}

  loadSchools$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolActions.loadSchools),
      switchMap(() =>
        this.schoolService.getAll().pipe(
          map((schools) => SchoolActions.loadedSchools({ schools })),
          catchError((error: Error) =>
            of(SchoolActions.loadSchoolsError({ error: error.message }))
          )
        )
      )
    );
  });

  loadSchool$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolActions.loadSchool),
      switchMap(({ id }) =>
        this.schoolService.getById(id).pipe(
          map((school) => {
            if (!school) {
              return SchoolActions.loadSchoolError({
                error: `School with id ${id} not found`,
              });
            }
            return SchoolActions.loadedSchool({ school });
          }),
          catchError((error: Error) =>
            of(SchoolActions.loadSchoolError({ error: error.message }))
          )
        )
      )
    );
  });

  createSchool$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolActions.createSchool),
      switchMap(({ school }) =>
        this.schoolService.create(school).pipe(
          map(() => SchoolActions.mutationSuccess()),
          catchError((error: Error) =>
            of(SchoolActions.mutationError({ error: error.message }))
          )
        )
      )
    );
  });

  updateSchool$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolActions.updateSchool),
      switchMap(({ schoolId, school }) =>
        this.schoolService.update(schoolId, school).pipe(
          map(() => SchoolActions.mutationSuccess()),
          catchError((error: Error) =>
            of(SchoolActions.mutationError({ error: error.message }))
          )
        )
      )
    );
  });

  deleteSchool$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolActions.deleteSchool),
      switchMap(({ id }) =>
        this.schoolService.delete(id).pipe(
          map(() => SchoolActions.mutationSuccess()),
          catchError((error: Error) =>
            of(SchoolActions.mutationError({ error: error.message }))
          )
        )
      )
    );
  });
}
