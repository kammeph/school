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
  DamagedBook,
  SchoolClass,
  SchoolClassBook,
} from '@school-book-storage/shared-models';
import { ActionSheetController, IonicModule, IonModal } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { SchoolClassManageDamagedBooksModalComponent } from '@school-book-storage/school-classes/ui/school-class-manage-damaged-books-modal';
import { selectSchoolClassById } from '@school-book-storage/school-classes/data-access';
import { selectCanDeleteDamagedBook } from '@school-book-storage/auth/data-access';

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
  providers: [InventoryStore, TranslatePipe],
})
export class SchoolClassDamagedBookListComponent implements OnInit {
  @ViewChild('manageDamagedBooksModal') manageDamagedBooksModal!: IonModal;

  @Input() schoolId!: string;
  @Input() schoolClassId!: string;
  @Input() books!: Book[] | null;

  schoolClass$!: Observable<SchoolClass | undefined>;
  damagedBooks$!: Observable<SchoolClassBook[]>;
  selectedBook?: Countable;
  canDeleteDamagedBook$ = this.store.select(selectCanDeleteDamagedBook);

  constructor(
    private store: Store,
    private inventoryStore: InventoryStore,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {}

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
    damagedBook: DamagedBook;
    booksInSchoolClass: BooksInSchoolClass;
  }) {
    this.inventoryStore.markDamagedBooks({
      schoolId: this.schoolId,
      damagedBooks: [event.damagedBook],
      booksInSchoolClasses: [event.booksInSchoolClass],
    });
    this.closeManageDamagedBooksModal();
  }

  async openDeleteDamagedBookActionSheet(bookId: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteDamagedBook'),
      buttons: [
        {
          text: this.translatePipe.transform('yes'),
          role: 'destructive',
          handler: () => {
            this.deleteDamagedBooks(bookId);
          },
        },
        {
          text: this.translatePipe.transform('no'),
          role: 'cancel',
        },
      ],
    });
    await sheet.present();
  }

  private deleteDamagedBooks(bookId: string) {
    this.inventoryStore.deleteDamagedBook({
      schoolId: this.schoolId,
      bookId,
      schoolClassId: this.schoolClassId,
    });
  }
}
