import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { CustomNotesService } from 'src/app/services/custom-notes.service';
import { NotesService } from 'src/app/services/notes.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  notesServiceData: Note[] = [];
  notesServiceDataPinned: Note[] = [];

  searchResult: Note[] = [];

  searching = false;

  notesResult = new Subject<Note[]>();
  archiveNotesResult = new Subject<Note[]>();

  lastSearchText: string = '';

  constructor(
    private ac: ActivatedRoute,
    private notesService: NotesService,
    private customNotesService: CustomNotesService,
    private archiveService: ArchiveService,
    private binService: BinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.endSearch.subscribe(() => {
    //   console.log('WORKS');
    //   this.router.navigate(['notes']);
    // });
  }

  search(searchText: string) {
    if (searchText.length < 1) {
      this.router.navigate(['notes']);
      return;
    }

    this.router.navigate(['search']);
    this.lastSearchText = searchText;

    // if (!this.searching) {
    //   this.startSearch.next();
    //   this.searching = true;
    // }

    // let array = this.getArray();
    // if (array === undefined) return;

    let notesSearchResult = this.searchInArray(
      this.notesService.notesContainer.concat(
        this.notesService.notesContainerPinned
      )
    );
    notesSearchResult.length > 0
      ? this.notesResult.next(notesSearchResult)
      : this.notesResult.next([]);
    //

    let archiveNotesSearchResult = this.searchInArray(
      this.archiveService.notesContainer
    );
    archiveNotesSearchResult.length > 0
      ? this.archiveNotesResult.next(archiveNotesSearchResult)
      : this.archiveNotesResult.next([]);
    //

    // this.newSearchResults.next(result.slice());
  }

  searchInArray(notes: Note[]): Note[] {
    let result: Note[] = [];

    for (const note of notes) {
      if (
        note.title
          .toLocaleLowerCase()
          .includes(this.lastSearchText.toLocaleLowerCase())
      ) {
        result.push(note);
      } else if (
        note.content
          .toLocaleLowerCase()
          .includes(this.lastSearchText.toLocaleLowerCase())
      ) {
        result.push(note);
      }
    }

    return result;
  }

  getArray() {
    // let route = this.ac.snapshot.children[0].url[0].path;
    // let array = this.notesService.notesContainer.concat(
    //   this.notesService.notesContainerPinned,
    //   this.customNotesService.notesContainer,
    //   this.customNotesService.notesContainerPinned,
    //   this.archiveService.notesContainer,
    //   this.binService.notesContainer
    // );
    // switch (route) {
    //   case 'notes':
    //     return [...this.notesServiceData, ...this.notesServiceDataPinned];
    //   case 'custom-notes':
    //     return [...this.notesServiceData, ...this.notesServiceDataPinned];
    //   case 'bin': {
    //     array = this.binService.getNotesForSearch();
    //     break;
    //   }
    //   case 'archive': {
    //     array = this.archiveService.getNotesForSearch();
    //     break;
    //   }
    //   default:
    //     console.log(
    //       'GET ARRAY FUNC IN SEARCH BAR SERVICE RETURNED UNDEFINED, check switch-case'
    //     );
    //     array = undefined;
    //     break;
    // }
    // return array;
  }
}
