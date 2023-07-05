import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Note } from '../models/note.model';
import { Action, Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as NotesActions from '../store/notes-store/notes.actions';
import * as ArchivedNotesActions from '../store/archive-store/archive.actions';
import * as DeletedNotesActions from '../store/bin-store/bin.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, combineLatest, map, of, switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotesResolverService implements Resolve<Note[][]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Note[][] | Observable<Note[][]> {
    return combineLatest([
      this.store.select('notes'),
      this.store.select('archivedNotes'),
      this.store.select('deletedNotes'),
    ]).pipe(
      take(1),
      map(([notesState, archivedNotesState, deletedNotesState]) => {
        return [
          notesState.notes,
          archivedNotesState.archivedNotes,
          deletedNotesState.deletedNotes,
        ];
      }),
      switchMap(([notes, archivedNotes, deletedNotes]) => {
        const actionsToDispatch: Action[] = [];

        if (notes.length === 0) {
          actionsToDispatch.push(new NotesActions.FetchNotes());
        }

        if (archivedNotes.length === 0) {
          actionsToDispatch.push(new ArchivedNotesActions.FetchNotes());
        }

        if (deletedNotes.length === 0) {
          actionsToDispatch.push(new DeletedNotesActions.FetchNotes());
        }

        if (actionsToDispatch.length > 0) {
          for (let action of actionsToDispatch) {
            this.store.dispatch(action);
          }

          return this.actions$.pipe(
            ofType(
              NotesActions.SET_NOTES,
              ArchivedNotesActions.SET_NOTES,
              DeletedNotesActions.SET_NOTES
            ),
            take(1)
          );
        } else {
          return of([notes, archivedNotes, deletedNotes]);
        }
      })
    );
  }
}
