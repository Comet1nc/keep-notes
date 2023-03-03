import { Component, OnInit } from '@angular/core';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  fromCategory = NoteCategory.notes;

  constructor(
    private notesService: NotesService,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.notesService.notesContainer;
    this.pinnedNotes = this.notesService.notesContainerPinned;

    this.notesService.myCategory = this.fromCategory;

    // filling db with some data for testing
    if (this.notesService.filled) return;
    let count = 0;
    for (let index = 0; index < 3; index++) {
      count++;
      let item = new Note(count.toString(), 'Hello world');
      this.notesService.notesContainer.push(item);
      let pinned = new Note(count.toString(), 'Hello world');
      pinned.isPinned = true;
      this.notesService.notesContainerPinned.push(pinned);
    }
    this.notesService.filled = true;
  }
}
