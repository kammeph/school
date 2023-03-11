import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectDisplayName,
  selectIsAdmin,
  selectUid,
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
  isAdmin$ = this.store.select(selectIsAdmin);
  userId$ = this.store.select(selectUid);

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

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

  navigateToProfile(userId: string) {
    this.router.navigate(['app', 'profile', userId]);
  }
}
