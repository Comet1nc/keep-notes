import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomNotesComponent } from './custom-notes.component';

const routes: Routes = [{ path: ':name', component: CustomNotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomNotesRoutingModule {}
