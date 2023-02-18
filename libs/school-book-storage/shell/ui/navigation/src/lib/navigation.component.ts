import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonPopover } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() displayName$!: Observable<string | undefined>;
  @Output() logout = new EventEmitter<void>();
  @ViewChild('userMenu') userMenu!: IonPopover;
  isUserMenuOpen = false;

  openUserMenu(e: Event) {
    this.userMenu.event = e;
    this.isUserMenuOpen = true;
  }
}
