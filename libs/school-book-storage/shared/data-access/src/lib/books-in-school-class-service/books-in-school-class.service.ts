import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { BooksInSchoolClass } from '@school-book-storage/shared-models';
import { setDoc } from 'firebase/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksInSchoolClassService {
  constructor(private firestore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/books-in-school-class`
    ) as CollectionReference<BooksInSchoolClass>;
  }

  set(schoolId: string, booksInSchoolClass: BooksInSchoolClass) {
    return from(
      setDoc(
        doc(
          this.getCollection(schoolId),
          `${booksInSchoolClass.bookId}${booksInSchoolClass.schoolClassId}`
        ),
        booksInSchoolClass
      )
    );
  }

  delete(schoolId: string, booksInSchoolClass: BooksInSchoolClass) {
    return from(
      deleteDoc(
        doc(
          this.getCollection(schoolId),
          `${booksInSchoolClass.bookId}${booksInSchoolClass.schoolClassId}`
        )
      )
    );
  }
}
