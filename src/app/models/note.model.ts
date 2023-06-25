export class Note {
  title: string;
  content: string;
  isPinned: boolean = false;
  labels: string[] = [];
  index!: number;
  createdAt!: Date;
  lastEditAt!: Date;
  color!: { name: string; valueLightTheme: string; valueDarkTheme: string };

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
