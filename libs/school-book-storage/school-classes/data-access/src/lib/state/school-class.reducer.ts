import { createReducer, on } from '@ngrx/store';
import { SchoolClass } from '@school-book-storage/shared-models';
import { SchoolClassActions } from './school-class.actions';

export type SchoolClassState = {
  schoolClasses: SchoolClass[];
  error?: string;
};

const initialState: SchoolClassState = {
  schoolClasses: [],
  error: undefined,
};

export const schoolClassReducer = createReducer(
  initialState,
  on(
    SchoolClassActions.loadSchoolClassesSuccess,
    (state, action): SchoolClassState => {
      return {
        ...state,
        schoolClasses: action.schoolClasses,
      };
    }
  ),
  on(
    SchoolClassActions.loadSchoolClassesFailure,
    (state, action): SchoolClassState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
