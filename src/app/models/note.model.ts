import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean = false;
  labels: string[] = [];
  createdAt!: Date;
  lastEditAt!: Date;
  color!: { name: string; valueLightTheme: string; valueDarkTheme: string };

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.id = uuidv4();
  }
}
