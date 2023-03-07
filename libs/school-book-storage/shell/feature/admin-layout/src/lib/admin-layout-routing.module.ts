import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'schools',
        loadChildren: () =>
          import('@school-book-storage/schools/shell').then(
            (m) => m.SchoolsShellModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@school-book-storage/users/shell').then(
            (m) => m.UsersShellModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
