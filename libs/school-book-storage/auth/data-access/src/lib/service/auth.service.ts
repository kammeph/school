import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  docData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, switchMap, tap } from 'rxjs';
import { from } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersRef: CollectionReference<User>;

  constructor(private auth: Auth, fireStore: Firestore) {
    this.usersRef = collection(fireStore, 'users') as CollectionReference<User>;
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential) => {
        const userDoc = doc(this.usersRef, userCredential.user.uid);
        return from(docData(userDoc, { idField: 'uid' }));
      })
    );
  }

  register(
    displayName: string,
    email: string,
    password: string
  ): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((userCredential) =>
        updateProfile(userCredential.user, { displayName })
      ),
      switchMap((userCredential) => {
        const { uid, email } = userCredential.user;
        const userDoc = doc(this.usersRef, uid);
        return from(
          setDoc(userDoc, {
            email: email ?? '',
            displayName,
            roles: [],
            schoolId: '',
          })
        ).pipe(switchMap(() => docData(userDoc, { idField: 'uid' })));
      })
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}
