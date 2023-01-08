import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import { User } from '@school/interfaces';
import { Observable, tap } from 'rxjs';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(this.mapUser)
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
      map((userCredential) => {
        const user = this.mapUser(userCredential);
        user.displayName = displayName;
        return user;
      })
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  private mapUser(userCredential: UserCredential): User {
    const { uid, email, displayName } = userCredential.user;
    return {
      uid,
      email: email ?? '',
      displayName: displayName ?? '',
      roles: [],
    };
  }
}
