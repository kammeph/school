import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
})
export class SchoolListComponent {
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
    private navCtrl: NavController
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
}
