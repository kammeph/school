import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer';

const selectBookState = createFeatureSelector<BookState>('book');

export const selectBooks = createSelector(
  selectBookState,
  (state) => state.books
);

export const selectBookById = (id: string) =>
  createSelector(selectBookState, (state) =>
    state.books.find((b) => b.id === id)
  );

export const selectBooksByIds = (ids: string[]) =>
  createSelector(selectBookState, (state) =>
    state.books.filter((b) => b.id && ids.includes(b.id))
  );

export const selectBookError = createSelector(
  selectBookState,
  (state) => state.error
);
