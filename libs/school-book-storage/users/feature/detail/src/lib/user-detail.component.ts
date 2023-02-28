import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserStore } from '@school-book-storage/users/data-access';
import { filter, Subscription, tap } from 'rxjs';

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
  });
  user$ = this.userStore.user$.pipe(
    tap((user) => this.userForm.patchValue({ ...user }))
  );

  constructor(
    private fb: FormBuilder,
    private userStore: UserStore,
    route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    const uid = route.snapshot.paramMap.get('id');
    if (uid) this.subscription.add(this.userStore.getById(uid));
    this.subscription.add(
      this.userStore.success$
        .pipe(filter((success) => success))
        .subscribe(() => this.navCtrl.back())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUser() {
    const update = this.userForm.getRawValue();
    this.userStore.update(update);
  }
}
