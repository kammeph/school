import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PwaUpdateService } from '@school-book-storage/shared/pwa-update';

@Component({
  selector: 'school-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [PwaUpdateService, TranslatePipe],
})
export class AppComponent {
  constructor(public pwaUpdateService: PwaUpdateService) {}
}
