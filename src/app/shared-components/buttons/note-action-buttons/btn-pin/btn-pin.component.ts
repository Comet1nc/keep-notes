import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-pin',
  templateUrl: './btn-pin.component.html',
  styleUrls: ['./btn-pin.component.scss', '../action-buttons.scss'],
})
export class BtnPinComponent {
  @Input() isNotePinned: boolean = false;
  @Output() togglePin = new EventEmitter<void>();
}
