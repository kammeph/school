import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonList, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import {
  SchoolActions,
  selectSchools,
} from '@school-book-storage/schools/data-access';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'school-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslatePipe],
})
export class SchoolListComponent {
  @ViewChild('schoolList') schoolList!: IonList;
  filterCtrl = new FormControl('');
  schools$ = combineLatest([
    this.store.select(selectSchools),
    this.filterCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([schools, filter]) =>
      schools?.filter((school) =>
        school.name.toLowerCase().includes(filter?.toLowerCase() || '')
      )
    )
  );

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {
    this.store.dispatch(SchoolActions.loadSchools());
  }

  addSchool() {
    this.navCtrl.navigateForward(['add'], {
      relativeTo: this.route,
    });
  }

  openSchool(schoolId?: string) {
    if (!schoolId) return;
    this.navCtrl.navigateForward([schoolId], {
      relativeTo: this.route,
    });
  }

  async openDeleteSchoolAlert(schoolId?: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteSchool'),
      buttons: [
        { text: this.translatePipe.transform('no'), role: 'cancel' },
        {
          text: this.translatePipe.transform('yes'),
          handler: () => this.deleteSchool(schoolId),
        },
      ],
    });
    sheet.present();
    this.schoolList.closeSlidingItems();
  }

  private deleteSchool(schoolId?: string) {
    if (!schoolId) return;
    this.store.dispatch(SchoolActions.deleteSchool({ id: schoolId }));
  }
}
