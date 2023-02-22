import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FormsModule } from '@angular/forms';
import { NoteFieldComponent } from './note-field/note-field.component';

@NgModule({
  declarations: [InputBarComponent, NoteFieldComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputBarComponent, NoteFieldComponent],
})
export class SharedComponentsModule {}
