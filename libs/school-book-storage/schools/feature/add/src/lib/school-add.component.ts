import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { SchoolActions } from '@school-book-storage/schools/data-access';

@Component({
  selector: 'school-school-add',
  templateUrl: './school-add.component.html',
  styleUrls: ['./school-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolAddComponent {
  schoolForm = this.fb.nonNullable.group({
    id: this.fb.nonNullable.control<string | undefined>(undefined),
    name: ['', Validators.required],
    description: this.fb.nonNullable.control<string | undefined>(undefined),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navCtrl: NavController
  ) {}

  save() {
    this.store.dispatch(
      SchoolActions.createSchool({ school: this.schoolForm.getRawValue() })
    );
    this.navCtrl.back();
  }
}
