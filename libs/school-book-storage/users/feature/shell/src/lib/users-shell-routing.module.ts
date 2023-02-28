import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@school-book-storage/users/list').then((m) => m.UsersModule),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@school-book-storage/users/detail').then(
        (m) => m.UserDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersShellRoutingModule {}
