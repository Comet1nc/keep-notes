import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as labelsActions from '../../../../store/labels-store/labels.actions';
import * as fromApp from '../../../../store/app.reducer';

@Component({
  selector: 'side-nav-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['../../labels-styles/label.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLabelsComponent {
  @Input() isSideNavOpened = false;
  @Input() title = '';
  @Input() svgPath: string = '';
  @Input() svgPaths: string[] = [''];
  @Input() isSelectedNote = false;

  constructor(private store: Store<fromApp.AppState>) {}

  getLabelClass() {
    if (this.isSideNavOpened) {
      return 'sideNavIsOpened';
    } else {
      return 'sideNavIsClosed';
    }
  }

  openEditLabels() {
    this.store.dispatch(new labelsActions.ToggleEditLabelMenu());
  }
}
