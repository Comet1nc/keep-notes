import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { AngularMaterialModule } from 'src/app/modules/angular-material.module';

@NgModule({
  declarations: [NotesComponent],
  providers: [NotesService, EditNoteService],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    SharedComponentsModule,
    AngularMaterialModule,
  ],
})
export class NotesModule {}
