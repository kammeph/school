import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { BooksInStorage } from '@school-book-storage/shared-models';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksInStorageService {
  constructor(private firestore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/books-in-storage`
    ) as CollectionReference<BooksInStorage>;
  }

  set(schoolId: string, booksInStorage: BooksInStorage) {
    return from(
      setDoc(
        doc(
          this.getCollection(schoolId),
          `${booksInStorage.bookId}${booksInStorage.storageId}`
        ),
        booksInStorage
      )
    );
  }

  delete(schoolId: string, booksInStorage: BooksInStorage) {
    return from(
      deleteDoc(
        doc(
          this.getCollection(schoolId),
          `${booksInStorage.bookId}${booksInStorage.storageId}`
        )
      )
    );
  }
}
