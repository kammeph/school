import { AbstractControl } from '@angular/forms';

export const passwordMatchValidator = (g: AbstractControl) => {
  return g.get('password')?.value === g.get('confirmPassword')?.value
    ? null
    : { mismatch: true };
};
