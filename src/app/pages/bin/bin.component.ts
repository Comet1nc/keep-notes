import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { BinService } from 'src/app/services/bin.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
})
export class BinComponent {
  notes: Note[] = [];

  showEditMode = false;
  editModeNoteData!: Note;

  readonly isBin = true;

  constructor(
    private editNoteService: EditNoteService,
    private binService: BinService
  ) {}

  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.showEditMode = true;

      this.editModeNoteData = note;
    });

    this.editNoteService.onCloseEditMode.subscribe(() => {
      this.showEditMode = false;
    });

    this.notes = this.binService.notesContainer;
  }
}
