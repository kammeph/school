import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { School } from '@school-book-storage/schools/data-access';

@Component({
  selector: 'school-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolFormComponent {
  @Input() schoolForm!: FormGroup<{
    id: FormControl<string | undefined>;
    name: FormControl<string>;
    description: FormControl<string | undefined>;
  }>;
  @Output() save = new EventEmitter<School>();

  submit() {
    this.save.emit(this.schoolForm.getRawValue());
  }
}
