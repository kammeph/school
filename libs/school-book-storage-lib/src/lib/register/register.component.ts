import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { passwordMatchValidator } from '@school/shared';
import { AuthActions } from '../auth/state/auth.actions';

@Component({
  selector: 'school-book-storage-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  constructor(private store: Store) {}

  onSubmit() {
    const { displayName, email, password } = this.registerForm.value;
    if (displayName && email && password) {
      this.store.dispatch(
        AuthActions.register({ displayName, email, password })
      );
    }
  }
}
