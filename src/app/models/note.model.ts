export class Note {
  title: string;
  content: string;
  isPinned: boolean = false;
  index!: number;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
