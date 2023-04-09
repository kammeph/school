import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countable } from '@school-book-storage/shared-models';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-countable-select-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
  templateUrl: './countable-select-modal.component.html',
  styleUrls: ['./countable-select-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountableSelectModalComponent {
  @Input() items$!: Observable<Countable[]>;
  @Output() selectionChange = new EventEmitter<Countable>();
  @Output() cancel = new EventEmitter();

  selectItem(item: Countable) {
    this.selectionChange.emit(item);
  }
}
