import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SearchService } from '../search/search.service';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { NoteColor } from 'src/app/models/note-colors.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  notes: Note[] = [];
  notes$ = this.store
    .select('archivedNotes')
    .pipe(map((state) => state.archivedNotes));

  showEditMode = false;
  editModeNote!: Note;

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private archiveService: ArchiveService,
    private searchService: SearchService,
    private binService: BinService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // if (!this.archiveService.filled) {
    //   this.archiveService.loadData();
    // }

    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    // this.notes = this.archiveService.notesContainer;
  }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNoteColor({ noteIndex, color })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    // this.archiveService.addLabel(label, note);

    this.store.dispatch(
      new archivedNotesActions.AddLabelToNote({ noteIndex, label })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    // this.archiveService.deleteLabel(event, note);
    this.store.dispatch(
      new archivedNotesActions.DeleteLabelFromNote({ noteIndex, label })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteNote(note: Note) {
    this.archiveService.deleteNote(note);
    this.binService.saveNewNote(note);
  }

  notesChanged() {
    this.archiveService.onNotesChanged.next();
  }

  unarchive(note: Note, noteIndex: number) {
    // this.archiveService.deleteNote(note);
    // this.archiveService.unArchiveNote.next(note);

    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }

  // saveNotesToLocalStorage() {
  //   this.archiveService.saveNotes();
  // }
}
