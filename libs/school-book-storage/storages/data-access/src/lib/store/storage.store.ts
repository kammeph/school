import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Storage } from '../models';
import { StorageService } from '../service';

type StoragesState = {
  storages: Storage[];
  storage?: Storage;
  error?: string;
  pending: boolean;
  success: boolean;
};

@Injectable()
export class StorageStore extends ComponentStore<StoragesState> {
  constructor(private StorageService: StorageService) {
    super({
      storages: [],
      storage: undefined,
      error: undefined,
      pending: false,
      success: false,
    });
  }

  readonly storages$ = this.select((state) => state.storages);
  readonly storage$ = this.select((state) => state.storage);
  readonly error$ = this.select((state) => state.error);
  readonly pending$ = this.select((state) => state.pending);
  readonly success$ = this.select((state) => state.success);

  readonly getAll = this.effect((schoolId$: Observable<string | undefined>) => {
    return schoolId$.pipe(
      tap(() => this.patchState({ pending: true, success: false })),
      switchMap((schoolId) =>
        this.StorageService.getStoragesBySchool(schoolId).pipe(
          tapResponse(
            (Storages) =>
              this.patchState({
                storages: Storages,
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
    (triggers$: Observable<{ schoolId: string; storageId: string }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true, success: false })),
        switchMap(({ schoolId, storageId }) =>
          this.StorageService.get(schoolId, storageId).pipe(
            tapResponse(
              (Storage) =>
                this.patchState({
                  storage: Storage,
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
