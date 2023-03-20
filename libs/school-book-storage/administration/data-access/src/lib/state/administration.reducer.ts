import { createReducer } from '@ngrx/store';
import { UserRole } from '@school-book-storage/auth/data-access';
import { Subject } from '@school-book-storage/shared-models';

export type AdministrationState = {
  userRoles: UserRole[];
  subjects: Subject[];
  grades: number[];
};

export const initialState: AdministrationState = {
  userRoles: Object.values(UserRole),
  subjects: Object.values(Subject),
  grades: [1, 2, 3, 4],
};

export const administrationReducer = createReducer(initialState);
