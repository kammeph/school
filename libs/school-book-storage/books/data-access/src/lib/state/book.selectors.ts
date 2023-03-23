import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer';

const selectBook = createFeatureSelector<BookState>('book');

export const selectBooks = createSelector(selectBook, (state) => state.books);

export const selectBookById = (id: string) =>
  createSelector(selectBook, (state) => state.books.find((b) => b.id === id));

export const selectBookError = createSelector(
  selectBook,
  (state) => state.error
);
