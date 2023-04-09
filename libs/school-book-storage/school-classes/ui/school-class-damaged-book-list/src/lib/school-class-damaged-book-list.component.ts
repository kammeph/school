import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  InventoryStore,
  selectDamagedBooksBySchoolClassId,
} from '@school-book-storage/inventory/data-access';
import { map, Observable } from 'rxjs';
import {
  Book,
  BooksInSchoolClass,
  Countable,
  DamagedBooks,
  SchoolClass,
  SchoolClassBook,
} from '@school-book-storage/shared-models';
import { IonicModule, IonModal } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolClassManageDamagedBooksModalComponent } from '@school-book-storage/school-classes/ui/school-class-manage-damaged-books-modal';
import { selectSchoolClassById } from '@school-book-storage/school-classes/data-access';

@Component({
  selector: 'school-school-class-damaged-book-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SchoolClassManageDamagedBooksModalComponent,
    TranslateModule,
  ],
  templateUrl: './school-class-damaged-book-list.component.html',
  styleUrls: ['./school-class-damaged-book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InventoryStore],
})
export class SchoolClassDamagedBookListComponent implements OnInit {
  @ViewChild('manageDamagedBooksModal') manageDamagedBooksModal!: IonModal;

  @Input() schoolId!: string;
  @Input() schoolClassId!: string;
  @Input() books!: Book[] | null;

  schoolClass$!: Observable<SchoolClass | undefined>;
  damagedBooks$!: Observable<SchoolClassBook[]>;
  selectedBook?: Countable;

  constructor(private store: Store, private inventoryStore: InventoryStore) {}

  ngOnInit(): void {
    this.damagedBooks$ = this.store
      .select(selectDamagedBooksBySchoolClassId(this.schoolClassId))
      .pipe(
        map((damagedBooks) => {
          return damagedBooks.map((damagedBook) => {
            return {
              id: damagedBook.bookId,
              name:
                this.books?.find((book) => book.id === damagedBook.bookId)
                  ?.name || '',
              count: damagedBook.count,
            };
          });
        })
      );

    this.schoolClass$ = this.store.select(
      selectSchoolClassById(this.schoolClassId)
    );
  }

  openManageDamagedBooksModal(book?: Countable) {
    this.selectedBook = book;
    this.manageDamagedBooksModal.present();
  }

  closeManageDamagedBooksModal() {
    this.manageDamagedBooksModal.dismiss();
  }

  saveDamagedBooks(event: {
    damagedBooks: DamagedBooks;
    booksInSchoolClass: BooksInSchoolClass;
  }) {
    this.inventoryStore.markDamagedBooks({
      schoolId: this.schoolId,
      damagedBooks: [event.damagedBooks],
      booksInSchoolClasses: [event.booksInSchoolClass],
    });
    this.closeManageDamagedBooksModal();
  }
}
