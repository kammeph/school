import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { AppLayoutComponent } from './app-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavigationModule } from '@school-book-storage/shell/navigation';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    NavigationModule,
    TranslateModule,
    IonicModule,
  ],
})
export class AppLayoutModule {}
