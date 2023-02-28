import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '@school-book-storage/auth/data-access';
import { from, map } from 'rxjs';

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
    const userDoc = doc(this.usersCollectionRef, id);
    return from(getDoc(userDoc)).pipe(map((res) => res.data()));
  }

  update(user: User) {
    const userDoc = doc(this.usersCollectionRef, user.uid);
    return from(updateDoc(userDoc, { ...user }));
  }
}
