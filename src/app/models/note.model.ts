export class Note {
  title: string;
  content: string;
  isPinned: boolean = false;
  index!: number;
  fromCategory!: NoteCategory;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

export enum NoteCategory {
  notes = 'notes',
  archive = 'archive',
  bin = 'bin',
  reminders = 'reminders',
}
