import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-restore',
  templateUrl: './btn-restore.component.html',
  styleUrls: ['./btn-restore.component.scss', '../action-buttons.scss'],
})
export class BtnRestoreComponent {
  @Output() restoreFromBinEvent = new EventEmitter<void>();
}
