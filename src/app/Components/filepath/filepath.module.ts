import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilepathComponent,Popup,} from './filepath.component';
import { SharedModule} from '../shared/shared.module';
import { FilepathService} from '../../Service/app/filepath.service';
const routes: Routes = [{ path: '', component: FilepathComponent }];
 
@NgModule({
  declarations: [FilepathComponent,Popup,],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule
  ],
  entryComponents:[Popup,],
  providers:[FilepathService]

})
export class FilepathModule { }
