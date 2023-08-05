import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/note.model';

@Pipe({
  name: 'searchNotes',
  pure: true,
})
export class SearchNotesPipe implements PipeTransform {
  transform(notes: Note[], phrase: string): Note[] {
    return notes.filter((note: Note) => {
      let condition1 = note.content
        .toLocaleLowerCase()
        .includes(phrase.toLocaleLowerCase());

      let condition2 = note.title
        .toLocaleLowerCase()
        .includes(phrase.toLocaleLowerCase());
      return condition1 || condition2;
    });
  }
}
