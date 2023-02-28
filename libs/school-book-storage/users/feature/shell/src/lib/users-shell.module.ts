import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersShellRoutingModule } from './users-shell-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, UsersShellRoutingModule],
})
export class UsersShellModule {}
