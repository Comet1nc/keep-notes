import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../app.reducer';
import * as DeletedNotesActions from './bin.actions';

@Injectable()
export class DeletedNotesEffects {
  fetchDeletedNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeletedNotesActions.FETCH_NOTES),
        switchMap(() => {
          return this.http.get<Note[]>(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/bin.json'
          );
        }),
        map((notes) => {
          return new DeletedNotesActions.SetNotes(notes ? notes : []);
        })
      );
    },
    { dispatch: true }
  );

  storeDeletedNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeletedNotesActions.STORE_NOTES),
        withLatestFrom(this.store.select('deletedNotes')),
        switchMap(([actionData, notesState]) => {
          return this.http.put(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/bin.json',
            notesState.deletedNotes
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
