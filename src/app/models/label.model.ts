import { Note } from './note.model';

export class Label {
  name: string;
  notes: Note[] = [];
  notesPinned: Note[] = [];
  storageIndex!: number;

  constructor(private _name: string) {
    this.name = _name;
  }
}
