import { createReducer, on } from '@ngrx/store';
import { User } from '../models';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user?: User;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
      isLoggedIn: true,
    };
  }),
  on(AuthActions.logoutSuccess, (): AuthState => initialState)
);
