import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-delete-forever',
  templateUrl: './btn-delete-forever.component.html',
  styleUrls: ['./btn-delete-forever.component.scss', '../action-buttons.scss'],
})
export class BtnDeleteForeverComponent {
  @Output() deleteForeverEvent = new EventEmitter<void>();
}
