import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './navigation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
