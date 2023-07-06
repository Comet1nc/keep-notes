import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import * as archivedNotesActions from '../../store/archive-store/archive.actions';
import * as notesActions from '../../store/notes-store/notes.actions';
import * as deletedNotesActions from '../../store/bin-store/bin.actions';
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
  notes$ = this.store
    .select('archivedNotes')
    .pipe(map((state) => state.archivedNotes));

  showEditMode = false;
  noteForEdit!: Note;
  // noteForEditIndex!: number;

  readonly isArchive = true;

  constructor(
    private editNoteService: EditNoteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
    //   this.showEditMode = true;
    //   this.editModeNote = note;
    // });
    // this.editNoteService.onCloseEditMode.subscribe(() => {
    //   this.showEditMode = false;
    // });
  }

  startEditNote(note: Note, noteIndex: number) {
    this.noteForEdit = note;
    // this.noteForEditIndex = noteIndex;
    this.showEditMode = true;

    console.log('start edit | enter Property: ' + noteIndex);
    // console.log('start edit | editNoteIndex: ' + this.noteForEditIndex);
    console.log('start edit | noteForEdit: ' + this.noteForEdit);
  }

  updateNote(newNote: Note) {
    // console.log('update note | editNoteIndex: ' + this.noteForEditIndex);
    console.log('update note | newNote enter propert: ' + newNote);

    // this.store.dispatch(
    //   new notesActions.UpdateNote({ index: noteForEditIndex, newNote })
    // );
    this.store.dispatch(new notesActions.StoreNotes());

    this.showEditMode = false;
  }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.UpdateNoteColor({ noteIndex, color })
    );

    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.AddLabelToNote({ noteIndex, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    this.store.dispatch(
      new archivedNotesActions.DeleteLabelFromNote({ noteIndex, label })
    );
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  deleteNote(note: Note, noteIndex: number) {
    this.store.dispatch(new deletedNotesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new deletedNotesActions.StoreNotes());
    this.store.dispatch(new archivedNotesActions.StoreNotes());
  }

  unarchive(note: Note, noteIndex: number) {
    this.store.dispatch(new notesActions.AddNote(note));
    this.store.dispatch(new archivedNotesActions.DeleteNote(noteIndex));

    this.store.dispatch(new archivedNotesActions.StoreNotes());
    this.store.dispatch(new notesActions.StoreNotes());
  }
}
