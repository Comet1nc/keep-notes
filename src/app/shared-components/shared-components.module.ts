import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteFieldComponent } from './note-field/note-field.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BtnAddImageComponent } from './buttons/note-action-buttons/btn-add-image/btn-add-image.component';
import { BtnChangeBgComponent } from './buttons/note-action-buttons/btn-change-bg/btn-change-bg.component';
import { BtnDeleteForeverComponent } from './buttons/note-action-buttons/btn-delete-forever/btn-delete-forever.component';
import { BtnDrawComponent } from './buttons/note-action-buttons/btn-draw/btn-draw.component';
import { BtnMoreOptionsComponent } from './buttons/note-action-buttons/btn-more-options/btn-more-options.component';
import { BtnRestoreComponent } from './buttons/note-action-buttons/btn-restore/btn-restore.component';
import { BtnUnarchiveComponent } from './buttons/note-action-buttons/btn-unarchive/btn-unarchive.component';
import { BtnArchiveComponent } from './buttons/note-action-buttons/btn-archive/btn-archive.component';
import { BtnPinComponent } from './buttons/note-action-buttons/btn-pin/btn-pin.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  declarations: [
    InputBarComponent,
    NoteFieldComponent,
    EditNoteComponent,
    BtnArchiveComponent,
    BtnChangeBgComponent,
    BtnAddImageComponent,
    BtnDrawComponent,
    BtnMoreOptionsComponent,
    BtnDeleteForeverComponent,
    BtnRestoreComponent,
    BtnUnarchiveComponent,
    BtnPinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
  ],
  providers: [],
  exports: [
    InputBarComponent,
    NoteFieldComponent,
    EditNoteComponent,
    BtnArchiveComponent,
    BtnChangeBgComponent,
    BtnAddImageComponent,
    BtnDrawComponent,
    BtnMoreOptionsComponent,
    BtnDeleteForeverComponent,
    BtnRestoreComponent,
    BtnUnarchiveComponent,
    BtnPinComponent,
  ],
})
export class SharedComponentsModule {}
