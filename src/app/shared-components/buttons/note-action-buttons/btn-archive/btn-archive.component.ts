import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-btn-archive',
  templateUrl: './btn-archive.component.html',
  styleUrls: ['./btn-archive.component.scss', '../action-buttons.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnArchiveComponent {
  @Output() archiveNote = new EventEmitter<void>();
}
