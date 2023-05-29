import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { ArchiveComponent } from './archive.component';
import { ArchiveRoutingModule } from './archive-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [ArchiveComponent],
  providers: [NotesService, EditNoteService],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class ArchiveModule {}
