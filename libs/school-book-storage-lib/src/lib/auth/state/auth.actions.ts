import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@school/interfaces';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{
      user: User;
    }>(),
    'Login Failure': props<{ error: string }>(),
    Register: props<{ displayName: string; email: string; password: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});
