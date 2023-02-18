import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './password-validator';

describe('PasswordValidator', () => {
  it('should have no errors after form group is intialized', () => {
    const formGroup = new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      [passwordMatchValidator]
    );

    expect(formGroup.valid).toBe(true);
  });

  it('should have no errors when passwords match', () => {
    const formGroup = new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      [passwordMatchValidator]
    );

    formGroup.patchValue({ password: 'password', confirmPassword: 'password' });

    expect(formGroup.valid).toBe(true);
  });

  it('should have errors when passwords do not match', () => {
    const formGroup = new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      [passwordMatchValidator]
    );

    formGroup.patchValue({
      password: 'password',
      confirmPassword: 'password1',
    });

    expect(formGroup.valid).toBe(false);
  });
});
