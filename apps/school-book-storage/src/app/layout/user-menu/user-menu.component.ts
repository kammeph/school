import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../../state/app.actions';
import { selectDisplayName } from '../../state/app.selectors';

@Component({
  selector: 'school-book-storage-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  displayName$ = this.store.select(selectDisplayName);

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(AppActions.logout());
  }
}
