import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  snapToData,
  updateDoc,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { from, map, of } from 'rxjs';
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
    return from(getDoc(doc(this.schoolsCollection, id))).pipe(
      map((school) => snapToData(school, { idField: 'id' }) as School)
    );
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
