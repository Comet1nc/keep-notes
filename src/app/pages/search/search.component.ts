import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Note } from 'src/app/models/note.model';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  notes: Note[] = [];
  archiveNotes: Note[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.notesResult.subscribe((notes: Note[]) => {
      this.notes = notes;
    });

    this.searchService.archiveNotesResult.subscribe((notes: Note[]) => {
      this.archiveNotes = notes;
    });
  }
}
