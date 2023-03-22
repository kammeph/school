import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@school-book-storage/shared-models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Authentication Success': props<{
      user: User;
    }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Change Password': props<{ newPassword: string }>(),
    'Change Password Success': emptyProps(),
    'Change Password Failure': props<{ error: string }>(),
  },
});
