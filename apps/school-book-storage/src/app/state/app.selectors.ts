import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectApp = createFeatureSelector<AppState>('app');

export const selectIsLoggedIn = createSelector(
  selectApp,
  (state) => state.isLoggedIn
);

export const selectUid = createSelector(
  selectApp,
  (state: AppState) => state?.user?.uid
);

export const selectSchoolId = createSelector(
  selectApp,
  (state: AppState) => state?.user?.schoolId
);

export const selectDisplayName = createSelector(
  selectApp,
  (state: AppState) => state?.user?.displayName
);
