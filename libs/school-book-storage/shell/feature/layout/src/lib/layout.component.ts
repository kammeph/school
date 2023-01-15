import { Component, ViewChild } from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectDisplayName,
} from '@school-book-storage/auth/data-access';

@Component({
  selector: 'school-book-storage-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isUserMenuOpen = false;
  @ViewChild('userMenu') userMenu: IonPopover;

  displayName$ = this.store.select(selectDisplayName);

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
