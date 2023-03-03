import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchoolState } from './school.reducer';

export const selectSchoolState = createFeatureSelector<SchoolState>('school');

export const selectSchools = createSelector(
  selectSchoolState,
  (state) => state.schools
);

export const selectSchool = createSelector(
  selectSchoolState,
  (state) => state.school
);

export const selectSchoolError = createSelector(
  selectSchoolState,
  (state) => state.error
);
