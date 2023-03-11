import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdministrationState } from './administration.reducer';

export const selectAdministration =
  createFeatureSelector<AdministrationState>('administration');

export const selectUserRoles = createSelector(
  selectAdministration,
  (state) => state.userRoles
);

