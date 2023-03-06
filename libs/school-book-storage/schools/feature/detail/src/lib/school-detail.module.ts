import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolDetailComponent } from './school-detail.component';
import { SchoolDetailRoutingModule } from './school-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { SchoolFormModule } from '@school-book-storage/schools/form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SchoolFormModule,
    SchoolDetailRoutingModule,
    TranslateModule
  ],
  declarations: [SchoolDetailComponent],
})
export class SchoolDetailModule {}
