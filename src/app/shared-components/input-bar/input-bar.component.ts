import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { Note } from 'src/app/models/note.model';
import { CustomNotesService } from 'src/app/services/custom-notes.service';
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
  @Input() inCustom = false;

  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;

  constructor(
    private notesService: NotesService,
    private drawService: DrawService,
    private customNotesService: CustomNotesService
  ) {}

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
    if (newNote.isPinned) {
      if (this.inCustom) {
        this.customNotesService.saveNewNoteToPinned(newNote);
      } else {
        this.notesService.saveNewNoteToPinned(newNote);
      }
    } else {
      if (this.inCustom) {
        this.customNotesService.saveNewNote(newNote);
      } else {
        this.notesService.saveNewNote(newNote);
      }
    }

    // clearing input fields
    this.titleText = '';
    this.mainNoteText = '';
    inputField.innerText = '';
  }
}
