import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@school-book-storage/books/feature/list').then(
        (m) => m.BookListModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@school-book-storage/books/feature/details').then(
        (m) => m.BookDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksShellRoutingModule {}
