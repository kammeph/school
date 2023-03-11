import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonPopover } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'school-admin-navigation',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TranslateModule],
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavigationComponent {
  @Input() displayName$!: Observable<string | undefined>;
  @Output() logout = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();
  @ViewChild('userMenu') userMenu!: IonPopover;
  isUserMenuOpen = false;

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
