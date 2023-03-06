import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@school-book-storage/users/shell').then(
            (m) => m.UsersShellModule
          ),
      },
      {
        path: 'schools',
        loadChildren: () =>
          import('@school-book-storage/schools/shell').then(
            (m) => m.SchoolsShellModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
