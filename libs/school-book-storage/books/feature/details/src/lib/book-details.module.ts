import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details.component';
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';

@NgModule({
  imports: [
    BookDetailsRoutingModule,
    BookFormComponent,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [BookDetailsComponent],
})
export class BookDetailsModule {}
