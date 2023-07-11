import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable({ providedIn: 'root' })
export class EditNoteService {
  onBgChanged = new Subject<void>();
  closeEditMode = new Subject<void>();
}
