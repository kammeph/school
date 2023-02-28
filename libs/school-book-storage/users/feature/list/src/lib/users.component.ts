import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '@school-book-storage/auth/data-access';
import { UserStore } from '@school-book-storage/users/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'school-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  users$ = this.userStore.users$;

  constructor(
    public userStore: UserStore,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.userStore.getAll());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openUser(user: User) {
    this.navCtrl.navigateForward([user.uid], {
      relativeTo: this.route,
    });
  }
}
