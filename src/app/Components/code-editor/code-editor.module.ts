import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CodeEditorComponent } from './code-editor.component';

const routes: Routes = [{ path: '', component: CodeEditorComponent }];


@NgModule({
  declarations: [CodeEditorComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,],
    exports:[CodeEditorComponent]
})
export class CodeEditorModule { }
