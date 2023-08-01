import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as notesActions from '../../../store/notes-store/notes.actions';
import { Note } from 'src/app/models/note.model';
import { map, take } from 'rxjs/operators';
import { AppService, Theme } from 'src/app/services/app.service';

@Component({
  selector: 'tool-bar-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent {
  @Output() onThemeChanged = new EventEmitter<void>();
  isDarkMode$ = this.appService.appTheme$.pipe(
    map((theme) => theme === Theme.dark)
  );
  trashCount = 0;

  toggleDarkMode() {
    this.appService.switchTheme();
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private appService: AppService
  ) {}

  generateTrash() {
    for (let i = 0; i < 25; i++) {
      this.store.dispatch(
        new notesActions.AddNote(
          new Note('note nr ' + (this.trashCount + i), 'some note')
        )
      );
    }
    this.trashCount += 25;
  }

  deleteAllTrash() {
    this.store
      .select('notes')
      .pipe(take(1))
      .subscribe((notesState) => {
        const notes = notesState.notes;
        for (let index = 0; index < notes.length; index++) {
          this.store.dispatch(new notesActions.DeleteNote(notes[index].id));
        }
      });
    this.store.dispatch(new notesActions.StoreNotes());
  }
}
