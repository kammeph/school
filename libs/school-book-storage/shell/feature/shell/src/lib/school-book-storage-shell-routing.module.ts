import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@school-book-storage/shared/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    loadChildren: () =>
      import('@school-book-storage/shell/app-layout').then(
        (m) => m.AppLayoutModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@school-book-storage/shell/admin-layout').then(
        (m) => m.AdminLayoutModule
      ),
    // canActivate: [AuthGuard],
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
