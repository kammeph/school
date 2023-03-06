import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { School } from '../models';

export const SchoolActions = createActionGroup({
  source: 'School',
  events: {
    'Load Schools': emptyProps(),
    'Loaded Schools': props<{ schools: School[] }>(),
    'Load Schools Error': props<{ error: string }>(),
    'Load School': props<{ id: string }>(),
    'Loaded School': props<{ school: School }>(),
    'Load School Error': props<{ error: string }>(),
    'Create School': props<{ school: School }>(),
    'Update School': props<{ school: School }>(),
    'Delete School': props<{ id: string }>(),
    'Mutation Success': emptyProps(),
    'Mutation Error': props<{ error: string }>(),
  },
});
