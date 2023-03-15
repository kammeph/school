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
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, of } from 'rxjs';
import { SchoolClass } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SchoolClassService {
  constructor(private firestore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/school-classes`
    ) as CollectionReference<SchoolClass>;
  }

  getAllBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getCollection(schoolId), { idField: 'id' });
  }

  get(schoolId: string, schoolClassId: string) {
    return from(getDoc(doc(this.getCollection(schoolId), schoolClassId))).pipe(
      map((schoolClass) => schoolClass.data())
    );
  }

  create(schoolId: string, schoolClass: SchoolClass) {
    return from(addDoc(this.getCollection(schoolId), schoolClass));
  }

  update(schoolId: string, schoolClassId: string, schoolClass: SchoolClass) {
    return from(
      updateDoc(doc(this.getCollection(schoolId), schoolClassId), schoolClass)
    );
  }

  delete(schoolId: string, schoolClassId: string) {
    return from(deleteDoc(doc(this.getCollection(schoolId), schoolClassId)));
  }
}
