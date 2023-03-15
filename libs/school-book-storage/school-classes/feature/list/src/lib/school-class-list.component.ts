import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionSheetController,
  IonicModule,
  IonModal,
  NavController,
} from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { SchoolClassFormComponent } from '@school-book-storage/school-classes/ui/form';
import { SchoolClassStore } from '@school-book-storage/school-classes/data-access';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { combineLatest, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'school-school-class-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SchoolClassFormComponent,
    TranslateModule,
  ],
  templateUrl: './school-class-list.component.html',
  styleUrls: ['./school-class-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SchoolClassStore, TranslatePipe],
})
export class SchoolClassListComponent {
  @ViewChild(IonModal) addSchoolClassModal!: IonModal;
  @ViewChild(SchoolClassFormComponent)
  addSchoolClassForm!: SchoolClassFormComponent;

  filterCtrl = new FormControl<string>('');
  schoolId$ = this.store
    .select(selectSchoolId)
    .pipe(tap((schoolId) => this.schoolClassStore.getAll(schoolId)));
  schoolClasses$ = combineLatest([
    this.schoolClassStore.schoolClasses$,
    this.filterCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([schoolClasses, filter]) =>
      schoolClasses.filter(
        (schoolClass) =>
          schoolClass.grade.toString().includes(filter?.toLowerCase() || '') ||
          schoolClass.letter.includes(filter?.toLowerCase() || '')
      )
    )
  );

  constructor(
    private store: Store,
    private schoolClassStore: SchoolClassStore,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {}

  openAddSchoolClassModal() {
    this.addSchoolClassModal.present();
  }

  createSchoolClass(schoolId: string) {
    const schoolClass = this.addSchoolClassForm.form.getRawValue();
    this.schoolClassStore.create({ schoolId, schoolClass });
    this.addSchoolClassModal.dismiss();
  }

  cancel() {
    this.addSchoolClassModal.dismiss();
  }

  navigateToSchoolClassDetails(schoolClassId?: string) {
    if (schoolClassId)
      this.navCtrl.navigateForward([schoolClassId], { relativeTo: this.route });
  }

  async openDeleteSchoolClassSheet(schoolId: string, schoolClassId?: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteSchoolClass'),
      buttons: [
        {
          text: this.translatePipe.transform('delete'),
          role: 'destructive',
          handler: () => this.deleteSchoolClass(schoolId, schoolClassId),
        },
        {
          text: this.translatePipe.transform('cancel'),
          role: 'cancel',
        },
      ],
    });
    sheet.present();
  }

  private deleteSchoolClass(schoolId: string, schoolClassId?: string) {
    if (schoolClassId)
      this.schoolClassStore.delete({ schoolId, schoolClassId });
  }
}
