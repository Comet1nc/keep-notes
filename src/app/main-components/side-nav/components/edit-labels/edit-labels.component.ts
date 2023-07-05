import { Component, Input } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'side-nav-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['../../labels-styles/label.scss'],
})
export class EditLabelsComponent {
  @Input() isSideNavOpened = false;
  @Input() title = '';
  @Input() svgPath: string = '';
  @Input() svgPaths: string[] = [''];
  @Input() isSelectedNote = false;

  constructor(private labelService: LabelService) {}

  getLabelClass() {
    if (this.isSideNavOpened) {
      return 'sideNavIsOpened';
    } else {
      return 'sideNavIsClosed';
    }
  }

  openEditLabels() {
    this.labelService.openEditLabels.next();
  }
}
