import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Pipe({
  name: 'pinnedNotes',
  pure: true,
})
export class PinnedNotesPipe implements PipeTransform {
  transform(notes: Note[], isPinned: boolean): Note[] {
    return notes.filter((note: Note) => note.isPinned === isPinned);
  }
}
