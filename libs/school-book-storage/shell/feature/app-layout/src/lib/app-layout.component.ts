import { Component, ViewChild } from '@angular/core';
import { IonPopover, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectDisplayName,
} from '@school-book-storage/auth/data-access';
import { ChangePasswordFormComponent } from '@school-book-storage/shared/ui/change-password-form';

@Component({
  selector: 'school-book-storage-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  isUserMenuOpen = false;
  @ViewChild('userMenu') userMenu: IonPopover;

  displayName$ = this.store.select(selectDisplayName);

  constructor(private store: Store, private modalCtrl: ModalController) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  async openChangePasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordFormComponent,
    });

    modal.present();
  }

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
