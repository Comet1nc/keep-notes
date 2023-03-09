import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable()
export class EditNoteService {
  onOpenEditMode = new Subject<Note>();
  onCloseEditMode = new Subject<void>();
  onBgChanged = new Subject<void>();

  constructor() {}

  openEditMode(note: Note) {
    this.onOpenEditMode.next(note);
  }
}
