import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageStore } from '@school-book-storage/storages/data-access';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import { StorageFormComponent } from '@school-book-storage/storages/ui/form';
import { Store } from '@ngrx/store';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { combineLatest, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '@school-book-storage/books/data-access';
import { BooksInStorageStore } from '@school-book-storage/shared/data-access';
import { BooksInStorageFormComponent } from '@school-book-storages/storages/ui/books-in-storage-form';
import { StorageBook } from '@school-book-storage/shared-models';
import { z } from 'zod';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-storage-details',
  standalone: true,
  imports: [
    CommonModule,
    BooksInStorageFormComponent,
    IonicModule,
    StorageFormComponent,
    TranslateModule,
  ],
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StorageStore, BookStore, BooksInStorageStore],
})
export class StorageDetailsComponent {
  @ViewChild(StorageFormComponent) storageForm!: StorageFormComponent;
  @ViewChild('booksInStorageModal') booksInStorageModal!: IonModal;

  schoolId$ = this.store.select(selectSchoolId).pipe(
    tap((schoolId) => {
      if (schoolId && this.storageId) {
        this.storageStore.getById({ schoolId, storageId: this.storageId });
        this.bookStore.getAll(schoolId);
      }
    })
  );
  storage$ = this.storageStore.storage$;
  availableBooks$ = combineLatest([this.storage$, this.bookStore.books$]).pipe(
    map(([storage, books]) => {
      return books.filter(
        (book) =>
          !storage?.books?.length ||
          storage?.books?.every((b) => b.id !== book.id)
      );
    })
  );
  storageId = z.string().parse(this.route.snapshot.params['id']);
  selectedBook: StorageBook | undefined;

  constructor(
    private store: Store,
    private storageStore: StorageStore,
    private bookStore: BookStore,
    private booksInStorageStore: BooksInStorageStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateStorage(schoolId: string) {
    this.storageStore.update({
      schoolId,
      storageId: this.storageId,
      storage: this.storageForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/storages');
  }

  openBooksInStorageModal(book?: StorageBook) {
    this.selectedBook = book;
    this.booksInStorageModal.present();
  }

  saveBooksInStorage() {
    this.booksInStorageModal.dismiss();
  }

  deleteBooksInStorage(schoolId: string, book: StorageBook) {
    this.booksInStorageStore.delete({
      schoolId,
      booksInStorage: {
        bookId: book.id,
        storageId: this.storageId,
        count: book.count,
      },
    });
  }
}
