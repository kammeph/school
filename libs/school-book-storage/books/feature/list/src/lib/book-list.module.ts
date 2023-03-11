import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { BookListRoutingModule } from './book-list-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [BookListRoutingModule, CommonModule, IonicModule, TranslateModule],
  declarations: [BookListComponent],
})
export class BookListModule {}
