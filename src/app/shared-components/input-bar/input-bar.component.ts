import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss'],
})
export class InputBarComponent {
  titleText: string = '';
  mainNoteText: string = '';
  isOpened: boolean = false;
  noteIsPinned: boolean = false;
  @Output() saveNewNote = new EventEmitter<Note>();

  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;

  constructor(private drawService: DrawService) {}

  input(e: any) {
    this.mainNoteText = e.srcElement.innerText;
  }

  draw() {
    this.drawService.openDraw.next();
  }

  openSection() {
    this.isOpened = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 10);
  }

  closeSection(inputField: HTMLDivElement) {
    this.isOpened = false;

    if (this.titleText.length === 0 && this.mainNoteText.length === 0) {
      return;
    }

    let newNote = new Note(this.titleText, this.mainNoteText);
    newNote.isPinned = this.noteIsPinned;

    // saving
    this.saveNewNote.emit(newNote);

    // clearing input fields
    this.titleText = '';
    this.mainNoteText = '';
    inputField.innerText = '';
  }
}
