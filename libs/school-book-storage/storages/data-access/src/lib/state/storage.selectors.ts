import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StorageState } from './storage.reducer';

const selectStorageState = createFeatureSelector<StorageState>('storage');

export const selectStorages = createSelector(
  selectStorageState,
  (state) => state.storages
);

export const selectStorageById = (id: string) =>
  createSelector(selectStorageState, (state) =>
    state.storages.find((s) => s.id === id)
  );

export const selectStorageError = createSelector(
  selectStorageState,
  (state) => state.error
);
