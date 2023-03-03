import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { of } from 'rxjs';
import { School } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private schoolsCollection = collection(
    this.firestore,
    'schools'
  ) as CollectionReference<School>;

  constructor(private firestore: Firestore) {}

  getAll() {
    return collectionData(this.schoolsCollection, { idField: 'id' });
  }

  getById(id: string) {
    return docData(doc(this.schoolsCollection, id), {
      idField: 'id',
    });
  }

  create(school: School) {
    return of(addDoc(this.schoolsCollection, school));
  }

  update(school: School) {
    return of(updateDoc(doc(this.schoolsCollection, school.id), school));
  }

  delete(id: string) {
    return of(deleteDoc(doc(this.schoolsCollection, id)));
  }
}
