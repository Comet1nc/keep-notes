import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinnedNotesPipe } from './notes/pinned-notes.pipe';
import { CustomNotesPipe } from './notes/custom-notes.pipe';
import { SearchNotesPipe } from './notes/search-notes.pipe';

@NgModule({
  declarations: [PinnedNotesPipe, CustomNotesPipe, SearchNotesPipe],
  imports: [CommonModule],
  exports: [PinnedNotesPipe, CustomNotesPipe, SearchNotesPipe],
})
export class PipesModule {}
