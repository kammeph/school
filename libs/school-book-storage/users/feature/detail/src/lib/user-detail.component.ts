import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { selectUserRoles } from '@school-book-storage/administration/data-access';
import {
  AuthActions,
  selectIsAdmin,
  selectUid,
} from '@school-book-storage/auth/data-access';
import {
  SchoolActions,
  selectSchools,
} from '@school-book-storage/schools/data-access';
import { UserStore } from '@school-book-storage/users/data-access';
import { filter, Subscription, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'school-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnDestroy {
  private subscription = new Subscription();
  userForm = this.fb.nonNullable.group({
    uid: [''],
    displayName: [''],
    email: [''],
    roles: [[] as string[]],
    schoolId: [''],
    canLogin: [false],
  });
  user$ = this.userStore.user$.pipe(
    tap((user) => this.userForm.patchValue({ ...user }))
  );
  schools$ = this.store.select(selectSchools);
  userRoles$ = this.store.select(selectUserRoles);
  isAdmin$ = this.store.select(selectIsAdmin);
  loggedInUserId$ = this.store.select(selectUid);

  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
    private store: Store,
    route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    const uid = route.snapshot.paramMap.get('id');
    if (uid) this.subscription.add(this.userStore.getById(uid));
    this.subscription.add(
      this.user$
        .pipe(
          withLatestFrom(this.loggedInUserId$, this.userStore.success$),
          filter(
            ([user, loggedInUserId, success]) =>
              success && user?.uid === loggedInUserId
          ),
          tap(([user, loggedInUserId]) => {
            if (user && user.uid === loggedInUserId) {
              this.store.dispatch(AuthActions.authenticationSuccess({ user }));
            }
          })
        )
        .subscribe(() => this.navCtrl.navigateBack('/admin/users'))
    );
    this.store.dispatch(SchoolActions.loadSchools());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUser() {
    const update = this.userForm.getRawValue();
    this.userStore.update(update);
  }
}
