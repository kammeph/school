import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@school-book-storage/school-classes/feature/list').then(
        (m) => m.SchoolClassListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@school-book-storage/school-classes/feature/details').then(
        (m) => m.SchoolClassDetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolClassesShellRoutingModule {}
