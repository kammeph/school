import { createActionGroup, props } from '@ngrx/store';
import { Storage } from '@school-book-storage/shared-models';

export const StorageActions = createActionGroup({
  source: 'Storage',
  events: {
    'Load Storages': props<{ schoolId?: string }>(),
    'Load Storages Success': props<{ storages: Storage[] }>(),
    'Load Storages Failure': props<{ error: string }>(),
  },
});
