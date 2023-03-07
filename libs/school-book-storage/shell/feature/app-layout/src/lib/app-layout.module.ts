import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { AppLayoutComponent } from './app-layout.component';
import { IonicModule } from '@ionic/angular';
import { AppNavigationComponent } from '@school-book-storage/shell/app-navigation';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    AppLayoutRoutingModule,
    AppNavigationComponent,
    CommonModule,
    IonicModule,
  ],
})
export class AppLayoutModule {}
