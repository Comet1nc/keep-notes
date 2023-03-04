import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FormsModule } from '@angular/forms';
import { NoteFieldComponent } from './note-field/note-field.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [InputBarComponent, NoteFieldComponent, EditNoteComponent],
  imports: [CommonModule, FormsModule, MatTooltipModule],
  exports: [InputBarComponent, NoteFieldComponent, EditNoteComponent],
})
export class SharedComponentsModule {}
