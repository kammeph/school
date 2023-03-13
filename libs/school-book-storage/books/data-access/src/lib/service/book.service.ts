import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  snapToData,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, of } from 'rxjs';
import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private fireStore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.fireStore,
      `schools/${schoolId}/books`
    ) as CollectionReference<Book>;
  }

  getBooksBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getCollection(schoolId), {
      idField: 'id',
    });
  }

  getById(schoolId: string, bookId: string) {
    return from(getDoc(doc(this.getCollection(schoolId), bookId))).pipe(
      map((book) => snapToData(book, { idField: 'id' }) as Book)
    );
  }

  create(schoolId: string, book: Book) {
    return from(addDoc(this.getCollection(schoolId), book));
  }

  update(schoolId: string, book: Book) {
    return from(updateDoc(doc(this.getCollection(schoolId), book.id), book));
  }

  delete(schoolId: string, bookId: string) {
    return from(deleteDoc(doc(this.getCollection(schoolId), bookId)));
  }
}
