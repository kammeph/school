import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolClass } from '@school-book-storage/school-classes/data-access';

@Component({
  selector: 'school-school-class-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './school-class-form.component.html',
  styleUrls: ['./school-class-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolClassFormComponent implements OnInit {
  @Input() schoolClass!: SchoolClass;

  form!: FormGroup<{
    grade: FormControl<number>;
    letter: FormControl<string>;
    numberOfPupils: FormControl<number>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      grade: [this.schoolClass?.grade ?? 0],
      letter: [this.schoolClass?.letter ?? ''],
      numberOfPupils: [this.schoolClass?.numberOfPupils ?? 0],
    });
  }
}
