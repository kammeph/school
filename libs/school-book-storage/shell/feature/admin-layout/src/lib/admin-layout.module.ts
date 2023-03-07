import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminNavigationComponent } from '@school-book-storage/shell/admin-navigation';
import { IonicModule } from '@ionic/angular';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

@NgModule({
  imports: [
    AdminLayoutRoutingModule,
    AdminNavigationComponent,
    CommonModule,
    IonicModule,
  ],
  declarations: [AdminLayoutComponent],
})
export class AdminLayoutModule {}
