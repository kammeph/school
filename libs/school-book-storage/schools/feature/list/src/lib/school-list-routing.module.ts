import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolListComponent } from './school-list.component';

const routes: Routes = [{ path: '', component: SchoolListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolListRoutingModule {}
