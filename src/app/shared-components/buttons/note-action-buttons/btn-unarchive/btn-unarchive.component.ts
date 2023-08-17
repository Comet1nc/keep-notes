import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-btn-unarchive',
  templateUrl: './btn-unarchive.component.html',
  styleUrls: ['./btn-unarchive.component.scss', '../action-buttons.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnUnarchiveComponent {
  @Output() unarchiveEvent = new EventEmitter<void>();
}
