import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Note } from 'src/app/models/note.model';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  notes: Note[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.notesResult.subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }
}
