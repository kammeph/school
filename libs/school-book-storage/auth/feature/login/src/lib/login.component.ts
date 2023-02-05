import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '@school-book-storage/auth/data-access';

@Component({
  selector: 'school-book-storage-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }
}
