import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  selectBookTypes,
  selectGrades,
  selectSubjects,
} from '@school-book-storage/administration/data-access';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { BookStore } from '@school-book-storage/books/data-access';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import { SchoolClassStore } from '@school-book-storage/school-classes/data-access';
import {
  BookSchoolClass,
  BookStorage,
} from '@school-book-storage/shared-models';
import {
  BooksInSchoolClassStore,
  BooksInStorageStore,
} from '@school-book-storage/shared/data-access';
import { StorageStore } from '@school-book-storage/storages/data-access';
import { combineLatest, map, tap } from 'rxjs';
import { z } from 'zod';

@Component({
  selector: 'school-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BookStore,
    BooksInSchoolClassStore,
    BooksInStorageStore,
    SchoolClassStore,
    StorageStore,
  ],
})
export class BookDetailsComponent {
  @ViewChild(BookFormComponent) bookForm!: BookFormComponent;
  @ViewChild('booksInStorageModal') booksInStorageModal!: IonModal;
  @ViewChild('booksInSchoolClassModal') booksInSchoolClassModal!: IonModal;

  schoolId$ = this.store.select(selectSchoolId).pipe(
    tap((schoolId) => {
      if (schoolId && this.bookId) {
        this.bookStore.getById({ schoolId, bookId: this.bookId });
        this.storageStore.getAll(schoolId);
        this.schoolClassStore.getAll(schoolId);
      }
    })
  );
  book$ = this.bookStore.book$;
  availableStorages$ = combineLatest([
    this.book$,
    this.storageStore.storages$,
  ]).pipe(
    map(([book, storages]) => {
      return storages.filter(
        (storage) =>
          !book?.storages?.length ||
          book?.storages?.every((s) => s.id !== storage.id)
      );
    })
  );
  availableSchoolClasses$ = combineLatest([
    this.book$,
    this.schoolClassStore.schoolClasses$,
  ]).pipe(
    tap(([book, schoolClasses]) => console.log(book, schoolClasses)),
    map(([book, schoolClasses]) => {
      return schoolClasses.filter(
        (schoolClass) =>
          !book?.schoolClasses?.length ||
          book?.schoolClasses?.every((s) => s.id !== schoolClass.id)
      );
    }),
    tap((schoolClasses) => console.log(schoolClasses))
  );

  subjects$ = this.store.select(selectSubjects);
  grades$ = this.store.select(selectGrades);
  bookTypes$ = this.store.select(selectBookTypes);
  bookId = z.string().parse(this.route.snapshot.params['id']);
  selectedStorage: BookStorage | undefined;
  selectedSchoolClass: BookSchoolClass | undefined;

  constructor(
    private store: Store,
    private bookStore: BookStore,
    private storageStore: StorageStore,
    private schoolClassStore: SchoolClassStore,
    private booksInStorageStore: BooksInStorageStore,
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

  saveBooksInStorage() {
    this.booksInStorageModal.dismiss();
  }

  deleteBooksInStorage(schoolId: string, storage: BookStorage) {
    this.booksInStorageStore.delete({
      schoolId,
      booksInStorage: {
        bookId: this.bookId,
        storageId: storage.id,
        count: storage.count,
      },
    });
  }

  openBooksInSchoolClassModal(schoolClass?: BookSchoolClass) {
    this.selectedSchoolClass = schoolClass;
    this.booksInSchoolClassModal.present();
  }
}
