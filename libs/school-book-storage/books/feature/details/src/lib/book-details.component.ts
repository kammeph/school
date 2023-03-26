import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  selectBookTypes,
  selectGrades,
  selectSubjects,
} from '@school-book-storage/administration/data-access';
import {
  selectSchoolId,
  selectUid,
} from '@school-book-storage/auth/data-access';
import {
  BookStore,
  selectBookById,
} from '@school-book-storage/books/data-access';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import {
  InventoryStore,
  selectBooksInSchoolClassesByBookId,
  selectBooksInStoragesByBookId,
} from '@school-book-storage/inventory/data-access';
import { selectSchoolClasses } from '@school-book-storage/school-classes/data-access';
import {
  BookSchoolClass,
  BooksInSchoolClass,
  BooksInStorage,
  BookStorage,
  Inventory,
} from '@school-book-storage/shared-models';
import { selectStorages } from '@school-book-storage/storages/data-access';
import { combineLatest, map } from 'rxjs';
import { z } from 'zod';

@Component({
  selector: 'school-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookStore, InventoryStore],
})
export class BookDetailsComponent {
  @ViewChild(BookFormComponent) bookForm!: BookFormComponent;
  @ViewChild('booksInStorageModal') booksInStorageModal!: IonModal;
  @ViewChild('booksInSchoolClassModal') booksInSchoolClassModal!: IonModal;

  bookId = z.string().parse(this.route.snapshot.params['id']);

  userId$ = this.store.select(selectUid);
  schoolId$ = this.store.select(selectSchoolId);
  book$ = this.store.select(selectBookById(this.bookId));
  booksInStorages$ = this.store.select(
    selectBooksInStoragesByBookId(this.bookId)
  );
  booksInSchoolClasses$ = this.store.select(
    selectBooksInSchoolClassesByBookId(this.bookId)
  );

  availableStorages$ = combineLatest([
    this.booksInStorages$,
    this.store.select(selectStorages),
  ]).pipe(
    map(([booksInStorages, storages]) => {
      return storages.filter(
        (s) =>
          !booksInStorages?.length ||
          booksInStorages?.every((b) => b.storageId !== s.id)
      );
    })
  );
  availableSchoolClasses$ = combineLatest([
    this.booksInSchoolClasses$,
    this.store.select(selectSchoolClasses),
  ]).pipe(
    map(([booksInSchoolClasses, schoolClasses]) => {
      return schoolClasses.filter(
        (schoolClass) =>
          !booksInSchoolClasses?.length ||
          booksInSchoolClasses?.every((s) => s.schoolClassId !== schoolClass.id)
      );
    })
  );

  bookStorages$ = combineLatest([
    this.booksInStorages$,
    this.store.select(selectStorages),
  ]).pipe(
    map(([booksInStorages, storages]) => {
      return booksInStorages?.map((bookInStorage) => {
        const name =
          storages.find((s) => s.id === bookInStorage.storageId)?.name ?? '';
        return {
          id: bookInStorage.storageId,
          name,
          count: bookInStorage.count,
        };
      });
    })
  );

  bookSchoolClasses$ = combineLatest([
    this.booksInSchoolClasses$,
    this.store.select(selectSchoolClasses),
  ]).pipe(
    map(([booksInSchoolClasses, schoolClasses]) => {
      return booksInSchoolClasses?.map((booksInSchoolClass) => {
        const schoolClass = schoolClasses.find(
          (s) => s.id === booksInSchoolClass.schoolClassId
        );
        const name = schoolClass
          ? `${schoolClass.grade}${schoolClass.letter}`
          : '';
        return {
          id: booksInSchoolClass.schoolClassId,
          name,
          count: booksInSchoolClass.count,
        };
      });
    })
  );

  subjects$ = this.store.select(selectSubjects);
  grades$ = this.store.select(selectGrades);
  bookTypes$ = this.store.select(selectBookTypes);
  selectedStorage: BookStorage | undefined;
  selectedSchoolClass: BookSchoolClass | undefined;

  constructor(
    private store: Store,
    private bookStore: BookStore,
    private inventoryStore: InventoryStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateBook(schoolId: string) {
    this.bookStore.update({
      schoolId,
      bookId: this.bookId,
      book: this.bookForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/books');
  }

  openBooksInStorageModal(storage?: BookStorage) {
    this.selectedStorage = storage;
    this.booksInStorageModal.present();
  }

  saveBooksInStorage(
    schoolId: string,
    uid: string,
    event: {
      storageId: string;
      bookId: string;
      count: number;
      comment?: string;
    }
  ) {
    const inventory = Inventory.parse({
      ...event,
      createdBy: uid,
      createdAt: new Date().getTime(),
    });
    this.inventoryStore.createInventories({
      schoolId,
      inventories: [inventory],
    });
    this.booksInStorageModal.dismiss();
  }

  deleteBooksInStorage(schoolId: string, storage: BookStorage) {
    console.log(schoolId, storage);
  }

  openBooksInSchoolClassModal(schoolClass?: BookSchoolClass) {
    this.selectedSchoolClass = schoolClass;
    this.booksInSchoolClassModal.present();
  }

  executeTransaction(
    schoolId: string,
    event: {
      booksInSchoolClass: BooksInSchoolClass;
      booksInStorage: BooksInStorage;
    }
  ) {
    const { booksInSchoolClass, booksInStorage } = event;
    this.inventoryStore.executeTransactions({
      schoolId,
      booksInStorages: [booksInStorage],
      booksInSchoolClasses: [booksInSchoolClass],
    });
    this.booksInSchoolClassModal.dismiss();
  }
}
