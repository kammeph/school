import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@school-book-storage/shared/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@school-book-storage/shell/layout').then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@school-book-storage/auth/login').then((m) => m.LoginModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@school-book-storage/auth/register').then(
        (m) => m.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SchoolBookStorageLibRoutingModule {}
