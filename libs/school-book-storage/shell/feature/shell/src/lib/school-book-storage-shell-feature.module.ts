import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IonicModule } from '@ionic/angular';
import { SchoolBookStorageLibRoutingModule } from './school-book-storage-shell-routing.module';

import { CommonModule } from '@angular/common';
import {
  AuthEffects,
  authReducer,
} from '@school-book-storage/auth/data-access';

@NgModule({
  imports: [
    CommonModule,
    SchoolBookStorageLibRoutingModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class SchoolBookStorageShellModule {}
