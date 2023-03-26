import { createReducer, on } from '@ngrx/store';
import {
  BooksInSchoolClass,
  BooksInStorage,
  Inventory,
} from '@school-book-storage/shared-models';
import { InventoryActions } from './inventory.actions';

export type InventoryState = {
  inventories: Inventory[];
  booksInStorages: BooksInStorage[];
  booksInSchoolClasses: BooksInSchoolClass[];
  error?: string;
};

const initialState: InventoryState = {
  inventories: [],
  booksInStorages: [],
  booksInSchoolClasses: [],
};

export const inventoryReducer = createReducer(
  initialState,
  on(
    InventoryActions.loadInventoriesSuccess,
    (state, action): InventoryState => {
      return {
        ...state,
        inventories: action.inventories,
      };
    }
  ),
  on(
    InventoryActions.loadInventoriesFailure,
    (state, action): InventoryState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    InventoryActions.loadBooksInStorageSuccess,
    (state, action): InventoryState => {
      return {
        ...state,
        booksInStorages: action.booksInStorage,
      };
    }
  ),
  on(
    InventoryActions.loadBooksInStorageFailure,
    (state, action): InventoryState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    InventoryActions.loadBooksInSchoolClassSuccess,
    (state, action): InventoryState => {
      return {
        ...state,
        booksInSchoolClasses: action.booksInSchoolClass,
      };
    }
  ),
  on(
    InventoryActions.loadBooksInSchoolClassFailure,
    (state, action): InventoryState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
