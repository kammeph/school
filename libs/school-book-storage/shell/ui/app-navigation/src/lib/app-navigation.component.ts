import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, IonPopover } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { selectIsAdmin } from '@school-book-storage/auth/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-app-navigation',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TranslateModule],
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavigationComponent {
  @Input() displayName$!: Observable<string | undefined>;
  @Output() logout = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();
  @ViewChild('userMenu') userMenu!: IonPopover;

  isUserMenuOpen = false;
  isAdmin$ = this.store.select(selectIsAdmin);

  constructor(private store: Store) {}

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
