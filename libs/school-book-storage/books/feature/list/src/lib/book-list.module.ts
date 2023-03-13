import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { BookListRoutingModule } from './book-list-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BookListRoutingModule,
    BookFormComponent,
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [BookListComponent],
})
export class BookListModule {}
