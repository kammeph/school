import { createActionGroup, props } from '@ngrx/store';
import { SchoolClass } from '@school-book-storage/shared-models';

export const SchoolClassActions = createActionGroup({
  source: 'SchoolClass',
  events: {
    'Load School Classes': props<{ schoolId?: string }>(),
    'Load School Classes Success': props<{ schoolClasses: SchoolClass[] }>(),
    'Load School Classes Failure': props<{ error: string }>(),
  },
});
