import { createReducer } from '@ngrx/store';
import { UserRole } from '@school-book-storage/auth/data-access';
import { BookType, Subject } from '@school-book-storage/shared-models';

export type AdministrationState = {
  bookTypes: BookType[];
  userRoles: UserRole[];
  subjects: Subject[];
  grades: number[];
};

export const initialState: AdministrationState = {
  bookTypes: Object.values(BookType),
  userRoles: Object.values(UserRole),
  subjects: Object.values(Subject),
  grades: [1, 2, 3, 4],
};

export const administrationReducer = createReducer(initialState);
