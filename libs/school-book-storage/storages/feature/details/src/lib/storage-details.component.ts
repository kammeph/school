import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  selectStorageById,
  StorageStore,
} from '@school-book-storage/storages/data-access';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import { StorageFormComponent } from '@school-book-storage/storages/ui/form';
import { Store } from '@ngrx/store';
import {
  selectSchoolId,
  selectUid,
} from '@school-book-storage/auth/data-access';
import { combineLatest, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectBooks } from '@school-book-storage/books/data-access';
import { BooksInStorageFormComponent } from '@school-book-storages/storages/ui/books-in-storage-form';
import { Inventory, StorageBook } from '@school-book-storage/shared-models';
import { z } from 'zod';
import { TranslateModule } from '@ngx-translate/core';
import {
  InventoryStore,
  selectBooksInStoragesByStorageId,
} from '@school-book-storage/inventory/data-access';

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
  providers: [InventoryStore, StorageStore],
})
export class StorageDetailsComponent {
  @ViewChild(StorageFormComponent) storageForm!: StorageFormComponent;
  @ViewChild('booksInStorageModal') booksInStorageModal!: IonModal;

  storageId = z.string().parse(this.route.snapshot.params['id']);
  userId$ = this.store.select(selectUid);
  schoolId$ = this.store.select(selectSchoolId);
  storage$ = this.store.select(selectStorageById(this.storageId));
  books$ = this.store.select(selectBooks);
  booksInStorages$ = this.store.select(
    selectBooksInStoragesByStorageId(this.storageId)
  );

  availableBooks$ = combineLatest([this.booksInStorages$, this.books$]).pipe(
    map(([booksInStorages, books]) => {
      return books.filter(
        (book) =>
          !booksInStorages?.length ||
          booksInStorages?.every(
            (booksInStorage) => booksInStorage.bookId !== book.id
          )
      );
    })
  );
  selectedBook: StorageBook | undefined;

  storageBooks$ = combineLatest([this.booksInStorages$, this.books$]).pipe(
    map(([booksInStorages, books]) => {
      return booksInStorages?.map((booksInStorage) => {
        const name =
          books.find((book) => book.id === booksInStorage.bookId)?.name || '';
        return {
          id: booksInStorage.bookId,
          name,
          count: booksInStorage.count,
        };
      });
    })
  );

  constructor(
    private store: Store,
    private inventoryStore: InventoryStore,
    private storageStore: StorageStore,
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

  deleteBooksInStorage(schoolId: string, book: StorageBook) {
    console.log('deleteBooksInStorage', schoolId, book);
  }
}
