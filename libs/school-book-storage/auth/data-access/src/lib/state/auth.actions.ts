import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Success': props<{
      user: User;
    }>(),
    Register: props<{ displayName: string; email: string; password: string }>(),
    Logout: emptyProps(),
    'Register Failure': props<{ error: string }>(),
    'Logout Success': emptyProps(),
  },
});
