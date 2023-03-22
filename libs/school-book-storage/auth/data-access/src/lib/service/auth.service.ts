import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  CollectionReference,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Language, User } from '@school-book-storage/shared-models';
import { map, Observable, switchMap } from 'rxjs';
import { from } from 'rxjs';

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
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
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
            language: Language.German,
          })
        );
      }),
      switchMap(() => this.logout())
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  changePassword(newPassword: string): Observable<void> {
    return from(
      this.auth.currentUser
        ? updatePassword(this.auth.currentUser, newPassword)
        : Promise.resolve()
    );
  }
}
