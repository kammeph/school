import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  selectGrades,
  selectSubjects,
} from '@school-book-storage/administration/data-access';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import {
  BooksInStorage,
  BookStorage,
  BookStore,
} from '@school-book-storage/books/data-access';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import { StorageStore } from '@school-book-storage/storages/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'school-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookStore, StorageStore],
})
export class BookDetailsComponent {
  @ViewChild(BookFormComponent) bookForm!: BookFormComponent;
  @ViewChild('booksInStorageModal') booksInStorageModal!: IonModal;

  schoolId$ = this.store.select(selectSchoolId).pipe(
    tap((schoolId) => {
      if (schoolId && this.bookId) {
        this.bookStore.getById({ schoolId, bookId: this.bookId });
        this.storageStore.getAll(schoolId);
      }
    })
  );
  book$ = this.bookStore.book$;
  availableStorages$ = this.storageStore.storages$;
  subjects$ = this.store.select(selectSubjects);
  grades$ = this.store.select(selectGrades);
  bookId = this.route.snapshot.params['id'] as string;
  selectedStorage: BookStorage | undefined;

  constructor(
    private store: Store,
    private bookStore: BookStore,
    private storageStore: StorageStore,
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

  saveBooksInStorage(booksInStorage: BooksInStorage) {
    console.log(booksInStorage);
    this.booksInStorageModal.dismiss();
  }
}
