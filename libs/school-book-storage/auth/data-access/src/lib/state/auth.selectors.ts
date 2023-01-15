import { createFeatureSelector, createSelector } from '@ngrx/store';
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
