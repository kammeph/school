import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, IonicModule, TranslateModule, UsersRoutingModule],
})
export class UsersModule {}
