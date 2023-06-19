import { Note } from './note.model';

export class LabelOLD {
  name: string;
  notes: Note[] = [];
  notesPinned: Note[] = [];
  storageIndex!: number;

  constructor(private _name: string) {
    this.name = _name;
  }
}
