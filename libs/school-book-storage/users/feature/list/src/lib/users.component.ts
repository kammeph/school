import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '@school-book-storage/auth/data-access';
import { UserStore } from '@school-book-storage/users/data-access';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'school-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  filterCtrl = new FormControl('');
  users$ = combineLatest([
    this.userStore.users$,
    this.filterCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, filter]) =>
      users?.filter(
        (user) =>
          user.displayName
            .toLowerCase()
            .includes(filter?.toLowerCase() || '') ||
          user.email.toLowerCase().includes(filter?.toLowerCase() || '')
      )
    )
  );

  constructor(
    public userStore: UserStore,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.userStore.getAll();
  }

  openUser(user: User) {
    this.navCtrl.navigateForward([user.uid], {
      relativeTo: this.route,
    });
  }
}
