import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '@school-book-storage/shared-models';
import { UserStore } from '@school-book-storage/users/data-access';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'school-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslatePipe],
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
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {
    this.userStore.getAll();
  }

  openUser(user: User) {
    this.navCtrl.navigateForward([user.uid], {
      relativeTo: this.route,
    });
  }

  async openDeleteUserDialog(userId?: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteUser'),
      buttons: [
        {
          text: this.translatePipe.transform('delete'),
          role: 'destructive',
          handler: () => this.deleteUser(userId),
        },
        {
          text: this.translatePipe.transform('cancel'),
          role: 'cancel',
        },
      ],
    });

    sheet.present();
  }

  private deleteUser(userId?: string) {
    if (userId) this.userStore.delete(userId);
  }
}
