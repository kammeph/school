import { createActionGroup, props } from '@ngrx/store';
import { Book } from '@school-book-storage/shared-models';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': props<{ schoolId?: string }>(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: string }>(),
  },
});
