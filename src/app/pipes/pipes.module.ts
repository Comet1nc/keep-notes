import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinnedNotesPipe } from './notes/pinned-notes.pipe';
import { CustomNotesPipe } from './notes/custom-notes.pipe';

@NgModule({
  declarations: [PinnedNotesPipe, CustomNotesPipe],
  imports: [CommonModule],
  exports: [PinnedNotesPipe, CustomNotesPipe],
})
export class PipesModule {}
