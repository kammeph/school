import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from '@school-book-storage/shared/password-validator';
import { AuthActions } from '@school-book-storage/auth/data-access';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-school-book-storage-shared-ui-change-password-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent {
  changePasswordForm = this.fb.nonNullable.group(
    {
      password: [''],
      confirmPassword: [''],
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modalCtrl: ModalController
  ) {}

  save() {
    const newPassword = this.changePasswordForm.get('password')?.value;
    if (newPassword) {
      this.store.dispatch(AuthActions.changePassword({ newPassword }));
    }
    this.close();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
