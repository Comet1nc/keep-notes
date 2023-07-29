import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditNoteService {
  onBgChanged = new Subject<void>();
  closeEditMode = new Subject<void>();
}
