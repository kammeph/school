import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  writeBatch,
} from '@angular/fire/firestore';
import {
  BooksInSchoolClass,
  BooksInStorage,
  Inventory,
} from '@school-book-storage/shared-models';
import { from, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private firestore: Firestore) {}

  private getInventoryCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/inventories`
    ) as CollectionReference<Inventory>;
  }

  private getBooksInStorageCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/books-in-storage`
    ) as CollectionReference<BooksInStorage>;
  }

  private getBooksInSchoolClassCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/books-in-school-class`
    ) as CollectionReference<BooksInSchoolClass>;
  }

  getInventoriesBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getInventoryCollection(schoolId));
  }

  getBooksInStoragesBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getBooksInStorageCollection(schoolId));
  }

  getBooksInSchoolClassesBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getBooksInSchoolClassCollection(schoolId));
  }

  createInventories(schoolId: string, inventories: Inventory[]) {
    const batch = writeBatch(this.firestore);
    inventories.forEach((inventory) => {
      batch.set(doc(this.getInventoryCollection(schoolId), uuid()), inventory);
      const booksInStorageId = `${inventory.bookId}${inventory.storageId}`;
      batch.set(
        doc(this.getBooksInStorageCollection(schoolId), booksInStorageId),
        {
          storageId: inventory.storageId,
          bookId: inventory.bookId,
          count: inventory.count,
        },
        { merge: true }
      );
    });
    return from(batch.commit());
  }

  executeTransactions(
    schoolId: string,
    booksInStorage: BooksInStorage[],
    booksInSchoolClass: BooksInSchoolClass[]
  ) {
    const batch = writeBatch(this.firestore);
    booksInStorage.forEach((bookInStorage) => {
      const booksInStorageId = `${bookInStorage.bookId}${bookInStorage.storageId}`;
      bookInStorage.count === 0
        ? batch.delete(
            doc(this.getBooksInStorageCollection(schoolId), booksInStorageId)
          )
        : batch.set(
            doc(this.getBooksInStorageCollection(schoolId), booksInStorageId),
            bookInStorage
          );
    });
    booksInSchoolClass.forEach((bookInSchoolClass) => {
      const booksInSchoolClassId = `${bookInSchoolClass.bookId}${bookInSchoolClass.schoolClassId}`;
      bookInSchoolClass.count === 0
        ? batch.delete(
            doc(
              this.getBooksInSchoolClassCollection(schoolId),
              booksInSchoolClassId
            )
          )
        : batch.set(
            doc(
              this.getBooksInSchoolClassCollection(schoolId),
              booksInSchoolClassId
            ),
            bookInSchoolClass
          );
    });
    return from(batch.commit());
  }

  deleteBooksInStorage(schoolId: string, bookId: string, storageId: string) {
    const id = `${bookId}${storageId}`;
    return from(deleteDoc(doc(this.getBooksInStorageCollection(schoolId), id)));
  }
}
