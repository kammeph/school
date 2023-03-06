import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolAddComponent } from './school-add.component';
import { SchoolAddRoutingModule } from './school-add-routing.module';
import { SchoolFormModule } from '@school-book-storage/schools/form';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SchoolFormModule,
    SchoolAddRoutingModule,
    TranslateModule,
  ],
  declarations: [SchoolAddComponent],
})
export class SchoolAddModule {}
