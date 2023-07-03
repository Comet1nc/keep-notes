import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../app.reducer';
import * as ArchivedNotesActions from './archive.actions';

@Injectable()
export class ArchivedNotesEffects {
  fetchArchivedNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ArchivedNotesActions.FETCH_NOTES),
        switchMap(() => {
          return this.http.get<Note[]>(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/archived-notes.json'
          );
        }),
        map((notes) => {
          return new ArchivedNotesActions.SetNotes(notes);
        })
      );
    },
    { dispatch: true }
  );

  storeArchivedNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ArchivedNotesActions.STORE_NOTES),
        withLatestFrom(this.store.select('archivedNotes')),
        switchMap(([actionData, notesState]) => {
          return this.http.put(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/archived-notes.json',
            notesState.archivedNotes
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
