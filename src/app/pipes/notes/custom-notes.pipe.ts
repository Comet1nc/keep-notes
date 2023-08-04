import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Pipe({
  name: 'customNotes',
  pure: true,
})
export class CustomNotesPipe implements PipeTransform {
  transform(notes: Note[], isPinned: boolean, labelToFilter: string): Note[] {
    return notes.filter(
      (note: Note) =>
        note.isPinned === isPinned &&
        note.labels &&
        note.labels.find((label) => label === labelToFilter)
    );
  }
}
