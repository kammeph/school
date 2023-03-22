import { createReducer } from '@ngrx/store';
import {
  BookType,
  Language,
  Subject,
  UserRole,
} from '@school-book-storage/shared-models';

export type AdministrationState = {
  bookTypes: BookType[];
  userRoles: UserRole[];
  subjects: Subject[];
  grades: number[];
  languages: Language[];
};

export const initialState: AdministrationState = {
  bookTypes: Object.values(BookType),
  userRoles: Object.values(UserRole),
  subjects: Object.values(Subject),
  grades: [1, 2, 3, 4],
  languages: Object.values(Language),
};

export const administrationReducer = createReducer(initialState);
