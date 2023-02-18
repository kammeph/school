import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginStore } from '@school-book-storage/auth/data-access';

@Component({
  selector: 'school-book-storage-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginStore],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  error$ = this.loginStore.error$;

  constructor(private fb: FormBuilder, private loginStore: LoginStore) {}

  onSubmit() {
    this.loginStore.login(this.loginForm.getRawValue());
  }
}
