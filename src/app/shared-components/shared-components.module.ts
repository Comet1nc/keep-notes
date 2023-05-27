import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FormsModule } from '@angular/forms';
import { NoteFieldComponent } from './note-field/note-field.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArchiveComponent } from './action-buttons/btn-archive/btn-archive.component';
import { BtnChangeBgComponent } from './action-buttons/btn-change-bg/btn-change-bg.component';
import { BtnAddImageComponent } from './action-buttons/btn-add-image/btn-add-image.component';
import { BtnDrawComponent } from './action-buttons/btn-draw/btn-draw.component';
import { BtnMoreOptionsComponent } from './action-buttons/btn-more-options/btn-more-options.component';

@NgModule({
  declarations: [
    InputBarComponent,
    NoteFieldComponent,
    EditNoteComponent,
    ArchiveComponent,
    BtnChangeBgComponent,
    BtnAddImageComponent,
    BtnDrawComponent,
    BtnMoreOptionsComponent,
  ],
  imports: [CommonModule, FormsModule, MatTooltipModule],
  exports: [
    InputBarComponent,
    NoteFieldComponent,
    EditNoteComponent,
    ArchiveComponent,
    BtnChangeBgComponent,
    BtnDrawComponent,
    BtnMoreOptionsComponent,
  ],
})
export class SharedComponentsModule {}
