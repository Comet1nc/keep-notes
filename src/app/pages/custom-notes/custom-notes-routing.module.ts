import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomNotesComponent } from './custom-notes.component';
import { NotesResolverService } from 'src/app/services/notes-resolver.service';

const routes: Routes = [
  {
    path: ':name',
    component: CustomNotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomNotesRoutingModule {}
