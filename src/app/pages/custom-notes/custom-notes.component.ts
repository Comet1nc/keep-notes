import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-custom-notes',
  templateUrl: './custom-notes.component.html',
  styleUrls: ['./custom-notes.component.scss'],
})
export class CustomNotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  customLabelName: string = '';

  showEditMode = false;
  editModeNote!: Note;

  fromCategory = NoteCategory.custom;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService,
    private activeRoute: ActivatedRoute,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNote = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.customLabelName = this.activeRoute.snapshot.params['name'];

    if (!this.notesService.filled) {
      this.notesService.loadData();
    }

    this.getDataAndSetup(this.customLabelName);

    // subscribing to route changes
    this.activeRoute.params.subscribe((params: Params) => {
      this.customLabelName = params['name'];
      //
      this.getDataAndSetup(this.customLabelName);
    });

    this.notesService.newNotesArrived.subscribe(() =>
      this.getDataAndSetup(this.customLabelName)
    );
  }

  getDataAndSetup(customLabelName: string) {
    this.notes.splice(0);
    this.pinnedNotes.splice(0);

    for (let note of this.notesService.notesContainer) {
      if (!note.labels) continue;
      if (note.labels.find((value: string) => value === customLabelName)) {
        this.notes.push(note);
      }
    }

    for (let note of this.notesService.notesContainerPinned) {
      if (!note.labels) continue;
      if (note?.labels.find((value: string) => value === customLabelName)) {
        this.pinnedNotes.push(note);
      }
    }
  }

  archiveNote(note: Note) {
    this.notesService.deleteNote(note);
    note.fromCategory = this.fromCategory;
    this.archiveService.saveNewNote(note);

    this.getDataAndSetup(this.customLabelName);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
    note.fromCategory = this.fromCategory;
    this.binService.saveNewNote(note);

    this.getDataAndSetup(this.customLabelName);
  }

  togglePin(note: Note) {
    this.notesService.togglePin(note);

    this.getDataAndSetup(this.customLabelName);
  }

  saveNewNote(note: Note) {
    if (this.customLabelName !== '') {
      note.labels.push(this.customLabelName);
    }

    if (note.isPinned) {
      this.notesService.saveNewNoteToPinned(note);
    } else {
      this.notesService.saveNewNoteToUnpinned(note);
    }

    this.getDataAndSetup(this.customLabelName);
  }

  notesChanged() {
    this.notesService.onNotesChanged.next();
  }

  saveNotes() {
    this.notesService.saveNotes();
  }
}
