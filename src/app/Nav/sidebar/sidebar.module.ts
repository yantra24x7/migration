import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../../Components/shared/shared.module';
import { SidebarComponent,editComponent } from './sidebar.component';

 const routes: Routes = [{ path: '', component: SidebarComponent }];


@NgModule({
  declarations: [SidebarComponent,editComponent],
  imports: [
     RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    // MatToolbarModule
    
  ],
  entryComponents: [editComponent]
})
export class SidebarModule { }
