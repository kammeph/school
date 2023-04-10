import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRole } from '@school-book-storage/shared-models';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state) => state.isLoggedIn
);

export const selectUid = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.uid
);

export const selectSchoolId = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.schoolId
);

export const selectDisplayName = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.displayName
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);

export const selectIsAdmin = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.roles?.includes(UserRole.Admin) ?? false
);

export const selectIsWarehouser = createSelector(
  selectAuth,
  (state: AuthState) =>
    state?.user?.roles?.includes(UserRole.Warehouser) ?? false
);

export const selectIsTeacher = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.roles?.includes(UserRole.Teacher) ?? false
);

export const selectIsStudent = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.roles?.includes(UserRole.Student) ?? false
);

export const selectCanDeleteDamagedBook = createSelector(
  selectAuth,
  (state: AuthState) =>
    state?.user?.roles?.includes(UserRole.Admin) ||
    state?.user?.roles?.includes(UserRole.Warehouser) ||
    false
);
