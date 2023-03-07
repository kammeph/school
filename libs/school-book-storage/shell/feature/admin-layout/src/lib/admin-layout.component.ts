import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  selectDisplayName,
} from '@school-book-storage/auth/data-access';

@Component({
  selector: 'school-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  isUserMenuOpen = false;
  @ViewChild('userMenu') userMenu!: IonPopover;

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
