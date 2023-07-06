import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';
import * as fromApp from '../../store/app.reducer';
import * as labelsActions from '../../store/labels-store/labels.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent implements OnInit {
  editLabelsOpened = false;
  newLabel: string = '';

  labels$ = this.store
    .select('labels')
    .pipe(map((labelsState) => labelsState.labels));

  constructor(
    private labelService: LabelService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.labelService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });
  }

  createNewLabel() {
    this.store.dispatch(new labelsActions.AddLabel(this.newLabel));
    this.store.dispatch(new labelsActions.StoreLabels());
  }

  clearNewLabelName() {
    this.newLabel = '';
  }

  deleteLabel(labelIndex: number) {
    this.store.dispatch(new labelsActions.DeleteLabel(labelIndex));
    this.store.dispatch(new labelsActions.StoreLabels());
  }

  renameLabel(input: HTMLInputElement, index: number) {
    this.store.dispatch(
      new labelsActions.UpdateLabel({ index, updatedLabel: input.value })
    );
    this.store.dispatch(new labelsActions.StoreLabels());
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
