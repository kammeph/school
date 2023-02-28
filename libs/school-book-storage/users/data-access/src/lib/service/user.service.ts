import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '@school-book-storage/auth/data-access';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollectionRef: CollectionReference<User>;

  constructor(private firestore: Firestore) {
    this.usersCollectionRef = collection(
      this.firestore,
      'users'
    ) as CollectionReference<User>;
  }

  getAll() {
    return collectionData(this.usersCollectionRef);
  }

  getById(id: string) {
    const userDoc = doc(this.firestore, `users/${id}`);
    return docData(userDoc) as Observable<User>;
  }

  update(user: User) {
    const userDoc = doc(this.firestore, `users/${user.uid}`);
    return from(updateDoc(userDoc, { ...user }));
  }
}
