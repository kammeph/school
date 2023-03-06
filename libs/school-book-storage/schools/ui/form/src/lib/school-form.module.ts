import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolFormComponent } from './school-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  declarations: [SchoolFormComponent],
  exports: [SchoolFormComponent],
})
export class SchoolFormModule {}
