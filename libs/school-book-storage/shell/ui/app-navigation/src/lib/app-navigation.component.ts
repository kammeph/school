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
import { TranslateModule } from '@ngx-translate/core';
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
  @Input() isAdmin$!: Observable<boolean>;
  @Output() logout = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();
  @Output() navigateToProfile = new EventEmitter<void>();
  @ViewChild('userMenu') userMenu!: IonPopover;

  isUserMenuOpen = false;

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
