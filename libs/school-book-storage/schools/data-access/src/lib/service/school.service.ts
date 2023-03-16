import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { from, map } from 'rxjs';
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
      map((school) => school.data())
    );
  }

  create(school: School) {
    return from(addDoc(this.schoolsCollection, school));
  }

  update(schoolId: string, school: School) {
    return from(updateDoc(doc(this.schoolsCollection, schoolId), school));
  }

  delete(id: string) {
    return from(deleteDoc(doc(this.schoolsCollection, id)));
  }
}
