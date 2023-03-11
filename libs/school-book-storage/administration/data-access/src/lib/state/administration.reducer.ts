import { createReducer } from '@ngrx/store';
import { UserRole } from '@school-book-storage/auth/data-access';

export interface AdministrationState {
  userRoles: UserRole[];
}

export const initialState: AdministrationState = {
  userRoles: Object.values(UserRole),
};

export const administrationReducer = createReducer(initialState);
