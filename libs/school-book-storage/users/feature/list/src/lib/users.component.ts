import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
