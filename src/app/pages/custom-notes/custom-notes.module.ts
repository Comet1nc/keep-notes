import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomNotesComponent } from './custom-notes.component';
import { FormsModule } from '@angular/forms';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { CustomNotesRoutingModule } from './custom-notes-routing.module';

@NgModule({
  declarations: [CustomNotesComponent],
  providers: [EditNoteService],
  imports: [
    CommonModule,
    CustomNotesRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class CustomNotesModule {}
