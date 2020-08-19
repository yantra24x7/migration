import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhgRoutingModule } from './fhg-routing.module';
import { FhgComponent } from './fhg.component';


@NgModule({
  declarations: [FhgComponent],
  imports: [
    CommonModule,
    FhgRoutingModule
  ]
})
export class FhgModule { }
