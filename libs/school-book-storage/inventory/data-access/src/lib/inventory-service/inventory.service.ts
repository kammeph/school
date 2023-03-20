import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { from } from 'rxjs';
import { Inventory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private firestore: Firestore) {}

  private getCollection(schoolId: string) {
    return collection(
      this.firestore,
      `schools/${schoolId}/inventories`
    ) as CollectionReference<Inventory>;
  }

  getAll(schoolId: string) {
    return collectionData(this.getCollection(schoolId));
  }

  create(schoolId: string, inventory: Inventory) {
    return from(addDoc(this.getCollection(schoolId), inventory));
  }
}
