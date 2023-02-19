import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Authentication Success': props<{
      user: User;
    }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});
