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
import { Storage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private firestore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/storages`
    ) as CollectionReference<Storage>;
  }

  getStoragesBySchool(schoolId?: string) {
    if (!schoolId) return of([]);
    return collectionData(this.getCollection(schoolId), {
      idField: 'id',
    });
  }

  get(schoolId: string, storageId: string) {
    return from(getDoc(doc(this.getCollection(schoolId), storageId))).pipe(
      map((storage) => storage.data())
    );
  }

  create(schoolId: string, storage: Storage) {
    return from(addDoc(this.getCollection(schoolId), storage));
  }

  update(schoolId: string, storageId: string, storage: Storage) {
    return from(
      updateDoc(doc(this.getCollection(schoolId), storageId), storage)
    );
  }

  delete(schoolId: string, storageId: string) {
    return from(deleteDoc(doc(this.getCollection(schoolId), storageId)));
  }
}
