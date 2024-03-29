import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Storage } from '@school-book-storage/shared-models';
import { StorageService } from '../service';

type StoragesState = {
  error?: string;
  pending: boolean;
  success: boolean;
};

@Injectable()
export class StorageStore extends ComponentStore<StoragesState> {
  constructor(private StorageService: StorageService) {
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
    (triggers$: Observable<{ schoolId: string; storage: Storage }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, storage }) =>
          this.StorageService.create(schoolId, storage).pipe(
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
      triggers$: Observable<{
        schoolId: string;
        storageId: string;
        storage: Storage;
      }>
    ) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, storageId, storage }) =>
          this.StorageService.update(schoolId, storageId, storage).pipe(
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
    (triggers$: Observable<{ schoolId: string; storageId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, storageId }) =>
          this.StorageService.delete(schoolId, storageId).pipe(
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
