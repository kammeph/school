import { createReducer, on } from '@ngrx/store';
import { Book } from '@school-book-storage/shared-models';
import { BookActions } from './book.actions';

export type BookState = {
  books: Book[];
  error?: string;
};

const initialState: BookState = {
  books: [],
  error: undefined,
};

export const bookReducer = createReducer(
  initialState,
  on(BookActions.loadBooksSuccess, (state, action): BookState => {
    return {
      ...state,
      books: action.books,
    };
  }),
  on(BookActions.loadBooksFailure, (state, action): BookState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
