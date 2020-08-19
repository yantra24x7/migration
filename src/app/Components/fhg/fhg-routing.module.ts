import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FhgComponent } from './fhg.component';

const routes: Routes = [{ path: '', component: FhgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FhgRoutingModule { }
