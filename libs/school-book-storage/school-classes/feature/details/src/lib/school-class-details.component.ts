import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SchoolClassStore,
  selectSchoolClassById,
} from '@school-book-storage/school-classes/data-access';
import { IonicModule, NavController } from '@ionic/angular';
import { SchoolClassFormComponent } from '@school-book-storage/school-classes/ui/form';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'school-school-class-details',
  standalone: true,
  imports: [CommonModule, IonicModule, SchoolClassFormComponent],
  templateUrl: './school-class-details.component.html',
  styleUrls: ['./school-class-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SchoolClassStore],
})
export class SchoolClassDetailsComponent {
  @ViewChild(SchoolClassFormComponent)
  schoolClassForm!: SchoolClassFormComponent;

  private schoolClassId = this.route.snapshot.params['id'] as string;
  schoolId$ = this.store.select(selectSchoolId);
  schoolClass$ = this.store.select(selectSchoolClassById(this.schoolClassId));

  constructor(
    private store: Store,
    private schoolClassStore: SchoolClassStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateSchoolClass(schoolId: string) {
    this.schoolClassStore.update({
      schoolId,
      schoolClassId: this.schoolClassId,
      schoolClass: this.schoolClassForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/school-classes');
  }
}
