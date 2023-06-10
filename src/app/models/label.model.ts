import { Note } from './note.model';

export class Label {
  name: string;
  notes: Note[] = [];
  notesPinned: Note[] = [];
  storageIndex!: string;

  constructor(private _name: string) {
    this.name = _name;
  }
}
