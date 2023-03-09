import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { map, Observable, switchMap, tap } from 'rxjs';
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

  login(email: string, password: string): Observable<User | undefined> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential) => {
        const userDoc = doc(this.usersRef, userCredential.user.uid);
        return from(getDoc(userDoc));
      }),
      map((userSnapshot) => userSnapshot.data())
    );
  }

  register(
    displayName: string,
    email: string,
    password: string
  ): Observable<User | undefined> {
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
            uid,
            email: email ?? '',
            displayName,
            roles: [],
            schoolId: '',
            canLogin: false,
          })
        ).pipe(
          switchMap(() => getDoc(userDoc)),
          map((userSnapshot) => userSnapshot.data())
        );
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
