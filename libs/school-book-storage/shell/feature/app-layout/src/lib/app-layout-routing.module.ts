import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from '@school-book-storage/shared/guards/profile-guard';
import { UserStore } from '@school-book-storage/users/data-access';
import { AppLayoutComponent } from './app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      {
        path: 'books',
        loadChildren: () =>
          import('@school-book-storage/books/feature/shell').then(
            (m) => m.BooksShellModule
          ),
      },
      {
        path: 'school-classes',
        loadChildren: () =>
          import('@school-book-storage/school-classes/feature/shell').then(
            (m) => m.SchoolClassesShellModule
          ),
      },
      {
        path: 'storages',
        loadChildren: () =>
          import('@school-book-storage/storages/feature/shell').then(
            (m) => m.StoragesShellModule
          ),
      },
      {
        path: 'profile/:id',
        loadChildren: () =>
          import('@school-book-storage/users/detail').then(
            (m) => m.UserDetailModule
          ),
        providers: [UserStore],
        canActivate: [ProfileGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutRoutingModule {}
