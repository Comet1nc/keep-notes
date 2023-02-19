import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, NotesRoutingModule, FormsModule],
})
export class NotesModule {}
