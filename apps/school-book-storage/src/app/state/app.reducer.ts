import { createReducer, on } from '@ngrx/store';
import { User } from '@school/interfaces';
import { AppActions } from './app.actions';

export interface AppState {
  user: User;
  isLoggedIn: boolean;
}

export const initialState: AppState = {
  user: { uid: 'init', email: '', displayName: '', roles: [], schoolId: '' },
  isLoggedIn: false,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.loginSuccess, (state, action): AppState => {
    return {
      ...state,
      user: action.user,
      isLoggedIn: true,
    };
  }),
  on(AppActions.logoutSuccess, (): AppState => initialState)
);
