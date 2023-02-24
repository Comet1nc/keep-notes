import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss'],
})
export class InputBarComponent {
  titleText: string = '';
  newNoteText: string = '';
  isOpened: boolean = false;
  @Output() saveNoteData = new EventEmitter<Note>();
  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }

  openSection() {
    this.isOpened = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 10);
  }
  closeSection(inputField: HTMLDivElement) {
    this.isOpened = false;

    if (this.titleText.length === 0 && this.newNoteText.length === 0) {
      return;
    }

    // saving
    this.saveNoteData.emit(new Note(this.titleText, this.newNoteText));

    // clearing input fields
    this.titleText = '';
    this.newNoteText = '';
    inputField.innerText = '';
  }
}

export class Note {
  title: string;
  content: string;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
