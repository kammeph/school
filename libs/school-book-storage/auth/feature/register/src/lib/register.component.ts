import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterStore } from '@school-book-storage/auth/data-access';
import { passwordMatchValidator } from '@school-book-storage/shared/password-validator';

@Component({
  selector: 'school-book-storage-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterStore],
})
export class RegisterComponent {
  registerForm = this.fb.nonNullable.group(
    {
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  error$ = this.registerStore.error$;

  constructor(private fb: FormBuilder, private registerStore: RegisterStore) {}

  onSubmit() {
    const { displayName, email, password } = this.registerForm.getRawValue();
    this.registerStore.register({ displayName, email, password });
  }
}
