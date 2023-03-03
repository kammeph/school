import { createReducer, on } from '@ngrx/store';
import { School } from '../models';
import { SchoolActions } from './school.actions';

export interface SchoolState {
  schools?: School[];
  school?: School;
  error?: string;
}

export const initialState: SchoolState = {
  schools: undefined,
  school: undefined,
  error: undefined,
};

export const schoolReducer = createReducer(
  initialState,
  on(SchoolActions.loadedSchools, (state, action): SchoolState => {
    return {
      ...state,
      schools: action.schools,
    };
  }),
  on(SchoolActions.loadSchoolsError, (state, action): SchoolState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(SchoolActions.loadedSchool, (state, action): SchoolState => {
    return {
      ...state,
      school: action.school,
    };
  }),
  on(SchoolActions.loadSchoolError, (state, action): SchoolState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
