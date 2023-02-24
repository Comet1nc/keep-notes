import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../shared-components/input-bar/input-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  closeEditMode = new Subject<Note>();
  openEditMode = new Subject<Note>();
}
