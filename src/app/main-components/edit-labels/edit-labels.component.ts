import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as labelsActions from '../../store/labels-store/labels.actions';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLabelsComponent {
  isEditLabelsMenuOpened$ = this.store
    .select('labels')
    .pipe(map((state) => state.isEditLabelsMenuOpen));
  newLabel: string = '';

  labels$ = this.store
    .select('labels')
    .pipe(map((labelsState) => labelsState.labels));

  constructor(
    private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  createNewLabel() {
    this.labels$.pipe(take(1)).subscribe((labels) => {
      if (labels.includes(this.newLabel) || this.newLabel.trim() === '') {
        this._snackBar.open('Wrong name.', 'Close');
      } else {
        this.store.dispatch(new labelsActions.AddLabel(this.newLabel));
        this.store.dispatch(new labelsActions.StoreLabels());
      }
    });
  }

  clearNewLabelName() {
    this.newLabel = '';
  }

  deleteLabel(labelIndex: number) {
    this.store.dispatch(new labelsActions.DeleteLabel(labelIndex));
    this.store.dispatch(new labelsActions.StoreLabels());
  }

  renameLabel(newName: string, index: number) {
    this.labels$.pipe(take(1)).subscribe((labels: string[]) => {
      if (labels.includes(newName)) {
        this._snackBar.open('Wrong name.', 'Close');
      } else {
        this.store.dispatch(
          new labelsActions.UpdateLabel({ index, updatedLabel: newName })
        );
        this.store.dispatch(new labelsActions.StoreLabels());

        if (
          this.activeRoute.snapshot.children[0].children[0].params['name'] ===
          labels[index]
        ) {
          this.router.navigate(['custom-notes/' + newName]);
        }

        this._snackBar.open('Successfully renamed!', 'Close');
      }
    });
  }

  closeEditLabels() {
    this.store.dispatch(new labelsActions.ToggleEditLabelMenu());
  }
}
