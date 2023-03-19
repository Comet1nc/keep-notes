import { Component, Input } from '@angular/core';
import { CustomNotesService } from 'src/app/services/custom-notes.service';

@Component({
  selector: 'side-nav-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent {
  @Input() isSideNavOpened = false;
  @Input() title = '';
  @Input() svgPath: string = '';
  @Input() svgPaths: string[] = [''];
  @Input() isSelectedNote = false;

  constructor(private customNotesService: CustomNotesService) {}

  getLabelClass() {
    if (this.isSideNavOpened) {
      return 'sideNavIsOpened';
    } else {
      return 'sideNavIsClosed';
    }
  }

  openEditLabels() {
    this.customNotesService.openEditLabels.next();
  }
}
