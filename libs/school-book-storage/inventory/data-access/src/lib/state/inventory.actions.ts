import { createActionGroup, props } from '@ngrx/store';
import {
  Inventory,
  BooksInStorage,
  BooksInSchoolClass,
} from '@school-book-storage/shared-models';

export const InventoryActions = createActionGroup({
  source: 'Inventory',
  events: {
    'Load Inventories': props<{ schoolId?: string }>(),
    'Load Inventories Success': props<{ inventories: Inventory[] }>(),
    'Load Inventories Failure': props<{ error: string }>(),
    'Load Books In Storage': props<{ schoolId?: string }>(),
    'Load Books In Storage Success': props<{
      booksInStorage: BooksInStorage[];
    }>(),
    'Load Books In Storage Failure': props<{ error: string }>(),
    'Load Books In School Class': props<{ schoolId?: string }>(),
    'Load Books In School Class Success': props<{
      booksInSchoolClass: BooksInSchoolClass[];
    }>(),
    'Load Books In School Class Failure': props<{ error: string }>(),
  },
});
