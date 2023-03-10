import { Component, Input } from '@angular/core';
import { EditLabelsService } from 'src/app/main-components/edit-labels/edit-labels.service';

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

  constructor(private editLabelsService: EditLabelsService) {}

  getLabelClass() {
    if (this.isSideNavOpened) {
      return 'sideNavIsOpened';
    } else {
      return 'sideNavIsClosed';
    }
  }

  openEditLabels() {
    this.editLabelsService.openEditLabels.next();
  }
}
