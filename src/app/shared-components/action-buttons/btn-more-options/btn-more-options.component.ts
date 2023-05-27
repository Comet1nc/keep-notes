import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-more-options',
  templateUrl: './btn-more-options.component.html',
  styleUrls: ['./btn-more-options.component.scss', '../action-buttons.scss'],
})
export class BtnMoreOptionsComponent {
  moreOptionsActive = false;
  @Output() deleteNote = new EventEmitter<void>();

  toggleMenu() {
    this.moreOptionsActive = !this.moreOptionsActive;
  }
}
