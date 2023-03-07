import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'school-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {}
