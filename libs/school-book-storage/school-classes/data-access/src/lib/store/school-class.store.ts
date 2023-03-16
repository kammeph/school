import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { SchoolClass } from '../models';
import { SchoolClassService } from '../service/school-class.service';

type SchoolClassesState = {
  schoolClasses: SchoolClass[];
  schoolClass?: SchoolClass;
  error?: string;
  pending: boolean;
  success: boolean;
};

@Injectable()
export class SchoolClassStore extends ComponentStore<SchoolClassesState> {
  constructor(private schoolClassService: SchoolClassService) {
    super({
      schoolClasses: [],
      schoolClass: undefined,
      error: undefined,
      pending: false,
      success: false,
    });
  }

  readonly schoolClasses$ = this.select((state) => state.schoolClasses);
  readonly schoolClass$ = this.select((state) => state.schoolClass);
  readonly error$ = this.select((state) => state.error);
  readonly pending$ = this.select((state) => state.pending);
  readonly success$ = this.select((state) => state.success);

  readonly getAll = this.effect((schoolId$: Observable<string | undefined>) => {
    return schoolId$.pipe(
      tap(() => this.patchState({ pending: true, success: false })),
      switchMap((schoolId) =>
        this.schoolClassService.getAllBySchool(schoolId).pipe(
          tapResponse(
            (schoolClasses) =>
              this.patchState({
                schoolClasses,
                pending: false,
                success: false,
              }),
            (error: Error) =>
              this.patchState({ error: error.message, pending: false })
          )
        )
      )
    );
  });

  readonly getById = this.effect(
    (triggers$: Observable<{ schoolId: string; schoolClassId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, schoolClassId }) =>
          this.schoolClassService.get(schoolId, schoolClassId).pipe(
            tapResponse(
              (schoolClass) =>
                this.patchState({
                  schoolClass,
                  pending: false,
                  success: false,
                }),
              (error: Error) =>
                this.patchState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );

  readonly create = this.effect(
    (triggers$: Observable<{ schoolId: string; schoolClass: SchoolClass }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, schoolClass }) =>
          this.schoolClassService.create(schoolId, schoolClass).pipe(
            tapResponse(
              () =>
                this.patchState({
                  pending: false,
                  success: true,
                }),
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
      triggers$: Observable<{
        schoolId: string;
        schoolClassId: string;
        schoolClass: SchoolClass;
      }>
    ) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, schoolClassId, schoolClass }) =>
          this.schoolClassService
            .update(schoolId, schoolClassId, schoolClass)
            .pipe(
              tapResponse(
                () =>
                  this.patchState({
                    pending: false,
                    success: true,
                  }),
                (error: Error) =>
                  this.patchState({ error: error.message, pending: false })
              )
            )
        )
      );
    }
  );

  readonly delete = this.effect(
    (triggers$: Observable<{ schoolId: string; schoolClassId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, schoolClassId }) =>
          this.schoolClassService.delete(schoolId, schoolClassId).pipe(
            tapResponse(
              () =>
                this.patchState({
                  pending: false,
                  success: true,
                }),
              (error: Error) =>
                this.patchState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );
}
