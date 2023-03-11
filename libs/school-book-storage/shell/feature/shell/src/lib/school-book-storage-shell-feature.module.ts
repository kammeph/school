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

@NgModule({
  imports: [
    CommonModule,
    SchoolBookStorageLibRoutingModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      auth: authReducer,
      school: schoolReducer,
      administration: administrationReducer,
    }),
    EffectsModule.forRoot([AuthEffects, SchoolEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class SchoolBookStorageShellModule {}
