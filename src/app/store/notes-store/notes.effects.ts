import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../app.reducer';
import * as NotesActions from './notes.actions';

@Injectable()
export class NotesEffects {
  fetchNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NotesActions.FETCH_NOTES),
        switchMap(() => {
          return this.http.get<Note[]>(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
          );
        }),
        map((notes) => {
          return new NotesActions.SetNotes(notes);
        })
      );
    },
    { dispatch: true }
  );

  storeNotes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NotesActions.STORE_NOTES),
        withLatestFrom(this.store.select('notes')),
        switchMap(([actionData, notesState]) => {
          return this.http.put(
            'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/notes.json',
            notesState
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
