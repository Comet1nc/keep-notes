import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Note } from '../models/note.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as NotesActions from '../store/notes-store/notes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, map, of, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesResolverService implements Resolve<Note[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Note[] | Observable<Note[]> {
    return this.store.select('notes').pipe(
      take(1),
      map((notesState) => {
        return notesState.notes;
      }),
      switchMap((notes) => {
        if (notes.length === 0) {
          this.store.dispatch(new NotesActions.FetchNotes());

          return this.actions$.pipe(ofType(NotesActions.SET_NOTES), take(1));
        } else {
          return of(notes);
        }
      })
    );
  }
}
