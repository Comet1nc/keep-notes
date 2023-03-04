import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

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
  @Output() saveNoteData = new EventEmitter<Note>();
  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;

  constructor(private notesService: NotesService) {}

  input(e: any) {
    this.mainNoteText = e.srcElement.innerText;
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
    if (newNote.isPinned) {
      this.notesService.saveNewNoteToPinned(newNote);
    } else {
      this.notesService.saveNewNote(newNote);
    }

    // clearing input fields
    this.titleText = '';
    this.mainNoteText = '';
    inputField.innerText = '';
  }
}
