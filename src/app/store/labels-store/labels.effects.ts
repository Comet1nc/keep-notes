import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import * as fromApp from '../app.reducer';
import * as LabelsActions from './labels.actions';

@Injectable()
export class LabelsEffects {
  fetchLabels = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LabelsActions.FETCH_LABELS),
        switchMap(() => {
          return this.http.get<string[]>(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json'
          );
        }),
        map((labels) => {
          return new LabelsActions.SetLabels(labels);
        })
      );
    },
    { dispatch: true }
  );

  storeLabels = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LabelsActions.STORE_LABELS),
        withLatestFrom(this.store.select('labels')),
        switchMap(([actionData, labelsState]) => {
          return this.http.put(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json',
            labelsState.labels
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
