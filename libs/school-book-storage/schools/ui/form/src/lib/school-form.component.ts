import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'school-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolFormComponent {
  @Input() schoolForm!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string | undefined>;
  }>;
}
