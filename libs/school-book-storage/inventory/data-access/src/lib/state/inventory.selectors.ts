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

export const selectDamagedBooks = createSelector(
  selectInventoryState,
  (state) => state.damagedBooks
);

export const selectDamagedBooksByBookId = (bookId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.damagedBooks.filter((b) => b.bookId === bookId)
  );

export const selectDamagedBooksBySchoolClassId = (schoolClassId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.damagedBooks.filter((b) => b.schoolClassId === schoolClassId)
  );

export const selectUndamagedBooksBySchoolClassId = (schoolClassId: string) =>
  createSelector(selectInventoryState, (state) =>
    state.booksInSchoolClasses.filter(
      (b) =>
        b.schoolClassId === schoolClassId &&
        state.damagedBooks.every((d) => b.bookId !== d.bookId)
    )
  );

export const selectBookCountInSchoolClass = (
  bookId: string,
  schoolClassId: string
) =>
  createSelector(
    selectInventoryState,
    (state) =>
      state.booksInSchoolClasses.find(
        (b) => b.bookId === bookId && b.schoolClassId === schoolClassId
      )?.count ?? 0
  );
