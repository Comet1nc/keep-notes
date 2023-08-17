import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'side-nav-custom-label',
  templateUrl: './custom-label.component.html',
  styleUrls: ['../../labels-styles/label.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLabelComponent {
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
