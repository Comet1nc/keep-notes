import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';
import { SearchService } from '../search/search.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as notesActions from '../../store/notes-store/notes.actions';
import { map } from 'rxjs';
import { NoteColor } from 'src/app/models/note-colors.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  pinnedNotes$ = this.store.select('notes').pipe(
    map((data) => {
      return data.notes.filter((note: Note) => note.isPinned);
    })
  );

  notes$ = this.store.select('notes').pipe(
    map((data) => {
      return data.notes.filter((note: Note) => !note.isPinned);
    })
  );

  showEditMode = false;
  editModeNote!: Note;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private searchService: SearchService,
    private archiveService: ArchiveService,
    private binService: BinService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    if (!this.notesService.filled) {
      this.notesService.loadData();
    }
  }

  setNoteColor(color: NoteColor, noteIndex: number) {
    this.store.dispatch(new notesActions.UpdateNoteColor({ noteIndex, color }));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  addLabel(label: string, noteIndex: number) {
    // this.notesService.addLabel(label, note);

    this.store.dispatch(new notesActions.AddLabelToNote({ noteIndex, label }));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  deleteLabel(label: string, noteIndex: number) {
    // this.notesService.deleteLabel(label, note);

    this.store.dispatch(
      new notesActions.DeleteLabelFromNote({ noteIndex, label })
    );

    this.store.dispatch(new notesActions.StoreNotes());
  }

  archiveNote(note: Note) {
    this.notesService.deleteNote(note);
    this.archiveService.saveNewNote(note);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
    this.binService.saveNewNote(note);
  }

  togglePin(noteIndex: number) {
    // this.notesService.togglePin(note);
    // let newNote: Note = Object.assign(note);
    // newNote.isPinned = !note.isPinned;

    // this.store.dispatch(
    //   new notesActions.UpdateNote({ index, newNote: newNote })
    // );

    this.store.dispatch(new notesActions.TogglePinNote(noteIndex));

    this.store.dispatch(new notesActions.StoreNotes());

    // console.log(note)
  }

  saveNewNote(note: Note) {
    // if (note.isPinned) {
    //   this.notesService.saveNewNoteToPinned(note);
    // } else {
    //   this.notesService.saveNewNoteToUnpinned(note);
    // }

    note.createdAt = new Date();

    this.store.dispatch(new notesActions.AddNote(note));

    this.store.dispatch(new notesActions.StoreNotes());
  }

  notesChanged() {
    this.notesService.saveNotes();
  }

  saveNotesToLocalStorage() {
    this.notesService.saveNotes();
  }
}
