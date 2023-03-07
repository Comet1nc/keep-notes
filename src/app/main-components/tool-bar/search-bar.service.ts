import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';

@Injectable()
export class SearchBarService {
  notesServiceData: Note[] = [];
  notesServiceDataPinned: Note[] = [];

  searchResult: Note[] = [];

  searching = false;
  startSearch = new Subject<void>();
  endSearch = new Subject<void>();
  newSearchResults = new Subject<Note[]>();

  constructor(
    private ac: ActivatedRoute,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  search(searchText: string) {
    if (!this.searching) {
      this.startSearch.next();
      this.searching = true;
    }

    let array = this.getArray();
    if (array === undefined) return;

    let result: Note[] = [];

    for (const note of array) {
      if (
        note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        result.push(note);
      } else if (
        note.content
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ) {
        result.push(note);
      }
    }

    this.newSearchResults.next(result.slice());
  }

  getArray() {
    let route = this.ac.snapshot.children[0].url[0].path;
    let array;
    switch (route) {
      case 'notes':
        return [...this.notesServiceData, ...this.notesServiceDataPinned];
      case 'bin': {
        array = this.binService.getNotesForSearch();
        break;
      }
      case 'archive': {
        array = this.archiveService.getNotesForSearch();
        break;
      }
      default:
        array = undefined;
        break;
    }
    return array;
  }
}
