import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../auth/state/auth.actions';

@Component({
  selector: 'school-book-storage-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }
}
