import { createReducer, on } from '@ngrx/store';
import { Storage } from '@school-book-storage/shared-models';
import { StorageActions } from './storage.actions';

export type StorageState = {
  storages: Storage[];
  error?: string;
};

const initialState: StorageState = {
  storages: [],
  error: undefined,
};

export const storageReducer = createReducer(
  initialState,
  on(StorageActions.loadStoragesSuccess, (state, action): StorageState => {
    return {
      ...state,
      storages: action.storages,
    };
  }),
  on(StorageActions.loadStoragesFailure, (state, action): StorageState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
