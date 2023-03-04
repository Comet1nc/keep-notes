import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinRoutingModule } from './bin-routing.module';
import { BinComponent } from './bin.component';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [BinComponent],
  providers: [NotesService, EditNoteService],
  imports: [
    CommonModule,
    BinRoutingModule,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class BinModule {}
