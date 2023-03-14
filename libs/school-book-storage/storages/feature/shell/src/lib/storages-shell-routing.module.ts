import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@school-book-storage/storages/feature/list').then(
        (m) => m.StorageListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@school-book-storage/storages/feature/details').then(
        (m) => m.StorageDetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoragesShellRoutingModule {}
