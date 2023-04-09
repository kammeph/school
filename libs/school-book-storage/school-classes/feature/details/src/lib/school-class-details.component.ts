import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SchoolClassStore,
  selectSchoolClassById,
} from '@school-book-storage/school-classes/data-access';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import { SchoolClassFormComponent } from '@school-book-storage/school-classes/ui/form';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  InventoryStore,
  selectBooksInSchoolClassesBySchoolClassId,
  selectBooksInStorages,
} from '@school-book-storage/inventory/data-access';
import { selectBooks } from '@school-book-storage/books/data-access';
import { z } from 'zod';
import { combineLatest, map, withLatestFrom } from 'rxjs';
import { selectStorages } from '@school-book-storage/storages/data-access';
import { BooksStorageSchoolClassTransferFormComponent } from '@school-book-storage/school-classes/ui/books-storage-school-class-transfer-form';
import {
  BooksInSchoolClass,
  BooksInStorage,
  SchoolClassBook,
} from '@school-book-storage/shared-models';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolClassDamagedBookListComponent } from '@school-book-storage/school-classes/ui/school-class-damaged-book-list';
import { SchoolClassMultiBookAssignmentComponent } from '@school-book-storage/school-classes/ui/school-class-multi-book-assignment';

@Component({
  selector: 'school-school-class-details',
  standalone: true,
  imports: [
    BooksStorageSchoolClassTransferFormComponent,
    CommonModule,
    IonicModule,
    SchoolClassFormComponent,
    SchoolClassDamagedBookListComponent,
    SchoolClassMultiBookAssignmentComponent,
    TranslateModule,
  ],
  templateUrl: './school-class-details.component.html',
  styleUrls: ['./school-class-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SchoolClassStore, InventoryStore],
})
export class SchoolClassDetailsComponent {
  @ViewChild(SchoolClassFormComponent)
  schoolClassForm!: SchoolClassFormComponent;
  @ViewChild('booksInSchoolClassModal') booksInSchoolClassModal!: IonModal;
  @ViewChild('multiBookAssignmentModal') multiBookAssignmentModal!: IonModal;

  schoolClassId = z.string().parse(this.route.snapshot.params['id']);
  schoolId$ = this.store.select(selectSchoolId);
  schoolClass$ = this.store.select(selectSchoolClassById(this.schoolClassId));
  books$ = this.store.select(selectBooks);
  storages$ = this.store.select(selectStorages);
  booksInSchoolClasses$ = this.store.select(
    selectBooksInSchoolClassesBySchoolClassId(this.schoolClassId)
  );
  booksInStorages$ = this.store.select(selectBooksInStorages);
  schoolClassBooks$ = combineLatest([
    this.books$,
    this.booksInSchoolClasses$,
  ]).pipe(
    map(([books, booksInSchoolClasses]) =>
      booksInSchoolClasses.map((booksInSchoolClass) => {
        const name =
          books.find((book) => book.id === booksInSchoolClass.bookId)?.name ||
          '';
        return {
          id: booksInSchoolClass.bookId,
          name,
          count: booksInSchoolClass.count,
        };
      })
    )
  );

  availableBooks$ = combineLatest([
    this.books$,
    this.booksInSchoolClasses$,
  ]).pipe(
    map(([books, booksInSchoolClasses]) => {
      return books?.reduce((schoolClassBooks, book) => {
        if (
          book.id &&
          (!booksInSchoolClasses.length ||
            booksInSchoolClasses.every((b) => b.bookId !== book.id))
        ) {
          const count =
            booksInSchoolClasses.find((b) => b.bookId === book.id)?.count || 0;
          schoolClassBooks.push({ id: book.id, name: book.name, count });
        }
        return schoolClassBooks;
      }, [] as SchoolClassBook[]);
    })
  );

  availableStorages$ = combineLatest([
    this.booksInSchoolClasses$,
    this.booksInStorages$,
  ]).pipe(
    map(([booksInSchoolClasses, booksInStorages]) => {
      return booksInStorages?.filter((booksInStorage) =>
        booksInSchoolClasses?.some(
          (booksInSchoolClass) =>
            booksInSchoolClass.bookId === booksInStorage.bookId
        )
      );
    }),
    withLatestFrom(this.storages$)
  );

  selectedBook?: SchoolClassBook;

  constructor(
    private store: Store,
    private inventoryStore: InventoryStore,
    private schoolClassStore: SchoolClassStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateSchoolClass(schoolId: string) {
    this.schoolClassStore.update({
      schoolId,
      schoolClassId: this.schoolClassId,
      schoolClass: this.schoolClassForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/school-classes');
  }

  openBooksInStorageModal(book?: SchoolClassBook) {
    this.selectedBook = book;
    this.booksInSchoolClassModal.present();
  }

  executeTransaction(
    schoolId: string,
    event: {
      booksInStorage: BooksInStorage;
      booksInSchoolClass: BooksInSchoolClass;
    }
  ) {
    this.inventoryStore.executeTransactions({
      schoolId,
      booksInStorages: [event.booksInStorage],
      booksInSchoolClasses: [event.booksInSchoolClass],
    });
    this.booksInSchoolClassModal.dismiss();
  }

  executeMultiBookAssignmentTransaction(
    schoolId: string,
    event: {
      booksInStorage: BooksInStorage[];
      booksInSchoolClass: BooksInSchoolClass[];
    }
  ) {
    this.inventoryStore.executeTransactions({
      schoolId,
      booksInStorages: event.booksInStorage,
      booksInSchoolClasses: event.booksInSchoolClass,
    });
    this.multiBookAssignmentModal.dismiss();
  }

  deleteBooksInStorage(schoolId: string, book: SchoolClassBook) {
    console.log(schoolId, book);
  }
}
