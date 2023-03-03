import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersComponent } from './reminders.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@NgModule({
  declarations: [RemindersComponent],
  providers: [NotesService, EditNoteService],
  imports: [CommonModule, RemindersRoutingModule, SharedComponentsModule],
})
export class RemindersModule {}
