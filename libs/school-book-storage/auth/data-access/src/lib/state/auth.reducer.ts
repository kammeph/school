import { createReducer, on } from '@ngrx/store';
import { User } from '../models';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user?: User;
  isLoggedIn: boolean;
  error?: string;
}

export const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  error: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticationSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
      isLoggedIn: true,
    };
  }),
  on(AuthActions.logoutSuccess, (): AuthState => initialState)
);
