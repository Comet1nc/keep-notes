import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from './search.service';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { NoteColor } from 'src/app/models/note-colors.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  notes$ = combineLatest([
    this.searchService.searchByPhrase$,
    this.store.select('notes'),
  ]).pipe(
    map(([phrase, notesState]) => {
      return notesState.notes;
    })
  );

  archivedNotes$ = combineLatest([
    this.searchService.searchByPhrase$,
    this.store.select('archivedNotes'),
  ]).pipe(
    map(([phrase, notesState]) => {
      return notesState.archivedNotes;
    })
  );

  showEditMode = false;
  noteForEdit$: Observable<Note>;
  noteForEdit: Note;
  isNoteForEditFromArchive: boolean = false;
  searchPhrase = '';

  constructor(
    private searchService: SearchService,
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {
    this.searchService.searchByPhrase$
      .pipe(takeUntilDestroyed())
      .subscribe((phrase) => {
        this.searchPhrase = phrase;
      });
  }

  filterByPhrase(phrase, notes) {
    return notes.filter((note) => {
      let condition1 = note.content
        .toLocaleLowerCase()
        .includes(phrase.toLocaleLowerCase());

      let condition2 = note.title
        .toLocaleLowerCase()
        .includes(phrase.toLocaleLowerCase());

      return condition1 || condition2;
    });
  }

  startEditNote(noteId: string, isNoteForEditFromArchive: boolean) {
    this.isNoteForEditFromArchive = isNoteForEditFromArchive;
    if (isNoteForEditFromArchive) {
      this.noteForEdit$ = this.store.select('archivedNotes').pipe(
        map((state) => {
          this.noteForEdit = state.archivedNotes.find(
            (note) => note.id === noteId
          );
          return this.noteForEdit;
        })
      );
    } else {
      this.noteForEdit$ = this.store.select('notes').pipe(
        map((state) => {
          this.noteForEdit = state.notes.find((note) => note.id === noteId);
          return this.noteForEdit;
        })
      );
    }
    this.showEditMode = true;
  }

  updateNote(newNote: Note) {
    if (this.isNoteForEditFromArchive) {
      this.store.dispatch(
        new archivedNotesActions.UpdateNote({
          id: this.noteForEdit.id,
          newNote,
        })
      );
      this.store.dispatch(new archivedNotesActions.StoreNotes());
    } else {
      this.store.dispatch(
        new notesActions.UpdateNote({ id: this.noteForEdit.id, newNote })
      );
      this.store.dispatch(new notesActions.StoreNotes());
    }

    this.showEditMode = false;
  }

  archiveNoteFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.archiveNote(this.noteForEdit, noteId);
  }

  deleteNoteFromEditMode(noteId: string) {
    this.editNoteService.closeEditMode.next();
    if (this.isNoteForEditFromArchive) {
      this.deleteNoteArchive(this.noteForEdit, noteId);
    } else {
      this.deleteNote(this.noteForEdit, noteId);
    }
  }

  archiveNote(note: Note, noteId: string) {
    this.store.dispatch(new archivedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteId));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteId: string) {
    this.store.dispatch(new notesActions.AddLabelToNote({ noteId, label }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, noteId: string) {
    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteId, label })
    );
    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteNote(note: Note, noteId: string) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new notesActions.DeleteNote(noteId));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  togglePin(noteId: string) {
    this.store.dispatch(new notesActions.TogglePinNote(noteId));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  setNoteColor(color: NoteColor, noteId: string) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteId, color }));
    this.store.dispatch(new notesActions.StoreNotes());
  }

  setNoteColorArchive(color: NoteColor, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNoteColor({ noteId, color })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  unarchiveFromEditMode(note: Note, noteId: string) {
    this.editNoteService.closeEditMode.next();
    this.unarchive(note, noteId);
  }

  unarchive(note: Note, noteId: string) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteId));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  identify(index: number, item: Note) {
    return item.id;
  }

  deleteLabelArchive(label: string, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.DeleteLabelFromNote({ noteId, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  addLabelArchive(label: string, noteId: string) {
    this.store.dispatch(
      new archivedNotesActions.AddLabelToNote({ noteId, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteNoteArchive(note: Note, noteId: string) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteId));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }
}
