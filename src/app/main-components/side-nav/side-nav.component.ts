import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  labels$ = this.store
    .select('labels')
    .pipe(map((labelsState) => labelsState.labels));

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });

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
