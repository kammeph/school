import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  SchoolActions,
  selectSchool,
} from '@school-book-storage/schools/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'school-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolDetailComponent {
  schoolForm = this.fb.nonNullable.group({
    id: this.fb.nonNullable.control<string | undefined>(undefined),
    name: ['', Validators.required],
    description: this.fb.nonNullable.control<string | undefined>(undefined),
  });

  school$ = this.store
    .select(selectSchool)
    .pipe(tap((school) => this.schoolForm.patchValue({ ...school })));

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.store.dispatch(SchoolActions.loadSchool({ id }));
  }

  save() {
    this.store.dispatch(
      SchoolActions.updateSchool({ school: this.schoolForm.getRawValue() })
    );
    this.navCtrl.back();
  }
}
