import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomNotesRoutingModule } from './custom-notes-routing.module';
import { CustomNotesComponent } from './custom-notes.component';
import { FormsModule } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { NotesRoutingModule } from '../notes/notes-routing.module';

@NgModule({
  declarations: [CustomNotesComponent],
  providers: [NotesService, EditNoteService],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class CustomNotesModule {}
