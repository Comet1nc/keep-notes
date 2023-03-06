import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';

@Injectable()
export class SearchBarService {
  constructor(
    private ac: ActivatedRoute,
    private archiveService: ArchiveService,
    private binService: BinService
  ) {}

  notesServiceData: Note[] = [];
  notesServiceDataPinned: Note[] = [];

  search(searchText: string) {
    let array = this.getArray();
    if (array === undefined) return;

    let result: Note[] = [];

    for (const note of array) {
      if (note.title.includes(searchText)) {
        // console.log(searchText);
        // console.log('finded in title');
        result.push(note);
      } else if (note.content.includes(searchText)) {
        // console.log('finded in content');

        result.push(note);
      }
    }

    console.log(result);
  }

  getArray() {
    let route = this.ac.snapshot.children[0].url[0].path;
    let array;
    switch (route) {
      case 'notes':
        return [...this.notesServiceData, ...this.notesServiceDataPinned];
        break;
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
