import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersShellRoutingModule } from './users-shell-routing.module';
import { UserStore } from '@school-book-storage/users/data-access';

@NgModule({
  imports: [CommonModule, RouterModule, UsersShellRoutingModule],
  providers: [UserStore],
})
export class UsersShellModule {}
