import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InventoryState } from './inventory.reducer';

const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const selectBooksInStorages = createSelector(
  selectInventoryState,
  (state) => state.booksInStorages
);

export const selectBooksInStoragesByBookId = (bookId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.booksInStorages.filter((b) => b.bookId === bookId)
  );

export const selectBooksInStoragesByStorageId = (storageId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.booksInStorages.filter((b) => b.storageId === storageId)
  );

export const selectBooksInSchoolClasses = createSelector(
  selectInventoryState,
  (state) => state.booksInSchoolClasses
);

export const selectBooksInSchoolClassesByBookId = (bookId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.booksInSchoolClasses.filter((b) => b.bookId === bookId)
  );

export const selectBooksInSchoolClassesBySchoolClassId = (
  schoolClassId: string
) =>
  createSelector(selectInventoryState, (state) =>
    state.booksInSchoolClasses.filter((b) => b.schoolClassId === schoolClassId)
  );
