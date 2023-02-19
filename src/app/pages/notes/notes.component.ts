import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  newNoteText: string = '';
  contentInputClicked = true;

  hideDeafultText() {
    this.contentInputClicked = false;
  }
}
