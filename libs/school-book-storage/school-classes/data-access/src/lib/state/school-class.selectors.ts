import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchoolClassState } from './school-class.reducer';

const selectSchoolClassState =
  createFeatureSelector<SchoolClassState>('schoolClass');

export const selectSchoolClasses = createSelector(
  selectSchoolClassState,
  (state) => state.schoolClasses
);

export const selectSchoolClassById = (id: string) =>
  createSelector(selectSchoolClassState, (state) =>
    state.schoolClasses.find((s) => s.id === id)
  );

export const selectSchoolClassError = createSelector(
  selectSchoolClassState,
  (state) => state.error
);
