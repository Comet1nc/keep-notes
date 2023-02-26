import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  closeEditMode = new Subject<Note>();
  openEditMode = new Subject<Note>();

  notesContainer: Note[] = [];
  notesContainerPinned: Note[] = [];
}
