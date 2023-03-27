import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SchoolClass } from '@school-book-storage/shared-models';
import { Observable, switchMap, tap } from 'rxjs';
import { SchoolClassService } from '../service/school-class.service';

type SchoolClassesState = {
  error?: string;
  pending: boolean;
  success: boolean;
};

@Injectable()
export class SchoolClassStore extends ComponentStore<SchoolClassesState> {
  constructor(private schoolClassService: SchoolClassService) {
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
