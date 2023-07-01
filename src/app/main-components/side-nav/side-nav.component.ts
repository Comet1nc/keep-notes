import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LabelService } from 'src/app/services/label.service';
import * as fromApp from '../../store/app.reducer';
import * as LabelsActions from '../../store/labels-store/labels.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sub!: Observable<void>;

  @Input() isSideNavOpened = true;

  // labels: string[] = [];

  labels$ = this.store
    .select('labels')
    .pipe(map((labelsState) => labelsState.labels));

  constructor(
    private labelService: LabelService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });

    // this.labels = this.labelService.labels;

    // this.labelService.loadLabels();

    this.store.dispatch(new LabelsActions.FetchLabels());
  }

  getClassByState() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }
}
