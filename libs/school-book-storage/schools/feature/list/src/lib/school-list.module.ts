import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolListRoutingModule } from './school-list-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolListComponent } from './school-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    ReactiveFormsModule,
    SchoolListRoutingModule,
  ],
  declarations: [SchoolListComponent],
})
export class SchoolListModule {}
