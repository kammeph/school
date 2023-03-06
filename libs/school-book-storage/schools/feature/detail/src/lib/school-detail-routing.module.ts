import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolDetailComponent } from './school-detail.component';

const routes: Routes = [{ path: '', component: SchoolDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolDetailRoutingModule {}
