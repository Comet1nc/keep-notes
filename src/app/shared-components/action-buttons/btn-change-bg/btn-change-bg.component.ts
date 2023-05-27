import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-change-bg',
  templateUrl: './btn-change-bg.component.html',
  styleUrls: ['./btn-change-bg.component.scss', '../action-buttons.scss'],
})
export class BtnChangeBgComponent {
  @Output() changeBg = new EventEmitter<void>();

  changeBgMenuActive = false;

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  // TO DO
  // setBg(color: any, noteRef: HTMLElement, note: Note) {
  //   this.note.color = color;

  //   this.notesService.saveToLocalStorage();

  //   this.changeBg(noteRef);
  // }
}
