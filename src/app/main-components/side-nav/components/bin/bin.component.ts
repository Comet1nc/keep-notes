import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-nav-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['../../labels-styles/label.scss'],
})
export class BinComponent {
  @Input() isSideNavOpened = false;
  @Input() title = '';
  @Input() svgPath: string = '';
  @Input() svgPaths: string[] = [''];
  @Input() isSelectedNote = false;

  getLabelClass() {
    if (this.isSideNavOpened) {
      return 'sideNavIsOpened';
    } else {
      return 'sideNavIsClosed';
    }
  }
}
