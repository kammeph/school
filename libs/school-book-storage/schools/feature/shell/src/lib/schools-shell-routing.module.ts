import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@school-book-storage/schools/list').then(
        (m) => m.SchoolListModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('@school-book-storage/schools/add').then((m) => m.SchoolAddModule),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@school-book-storage/schools/detail').then(
        (m) => m.SchoolDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolsShellRoutingModule {}
