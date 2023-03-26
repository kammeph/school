import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IonicModule } from '@ionic/angular';
import { SchoolBookStorageLibRoutingModule } from './school-book-storage-shell-routing.module';

import { CommonModule } from '@angular/common';
import { administrationReducer } from '@school-book-storage/administration/data-access';
import {
  AuthEffects,
  authReducer,
} from '@school-book-storage/auth/data-access';
import {
  SchoolEffects,
  schoolReducer,
} from '@school-book-storage/schools/data-access';
import {
  BookEffects,
  bookReducer,
} from '@school-book-storage/books/data-access';
import {
  StorageEffects,
  storageReducer,
} from '@school-book-storage/storages/data-access';
import {
  SchoolClassEffects,
  schoolClassReducer,
} from '@school-book-storage/school-classes/data-access';
import {
  InventoryEffects,
  inventoryReducer,
} from '@school-book-storage/inventory/data-access';

@NgModule({
  imports: [
    CommonModule,
    SchoolBookStorageLibRoutingModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      administration: administrationReducer,
      auth: authReducer,
      book: bookReducer,
      inventory: inventoryReducer,
      school: schoolReducer,
      schoolClass: schoolClassReducer,
      storage: storageReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BookEffects,
      InventoryEffects,
      SchoolEffects,
      SchoolClassEffects,
      StorageEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class SchoolBookStorageShellModule {}
