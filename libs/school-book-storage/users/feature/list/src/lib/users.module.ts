import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, IonicModule, UsersRoutingModule],
})
export class UsersModule {}
