import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Label } from 'src/app/models/label.model';
import { Note } from 'src/app/models/note.model';
import { ArchiveService } from 'src/app/services/archive.service';
import { BinService } from 'src/app/services/bin.service';
import { CustomNotesService } from 'src/app/services/custom-notes.service';
import { NotesService } from 'src/app/services/notes.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  searchResult: Note[] = [];

  searching = false;

  notesResult = new Subject<Note[]>();
  archiveNotesResult = new Subject<Note[]>();
  customNotesResult = new Subject<Label[]>();

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

    let notesSearchResult: Note[] = this.searchInArray(
      this.notesService.notesContainer.concat(
        this.notesService.notesContainerPinned
      )
    );
    notesSearchResult.length > 0
      ? this.notesResult.next(notesSearchResult)
      : this.notesResult.next([]);
    //

    let archiveNotesSearchResult: Note[] = this.searchInArray(
      this.archiveService.notesContainer
    );
    archiveNotesSearchResult.length > 0
      ? this.archiveNotesResult.next(archiveNotesSearchResult)
      : this.archiveNotesResult.next([]);
    //

    let customNotesSearchResult: Label[] = [];
    for (let label of this.customNotesService.labels) {
      let result: Note[] = this.searchInArray(
        label.notes.concat(label.notesPinned)
      );

      let labelWithResult = new Label(label.name);
      labelWithResult.notes = result;
      labelWithResult.storageIndex = label.storageIndex;

      if (result.length > 0) {
        customNotesSearchResult.push(labelWithResult);
      }
    }
    customNotesSearchResult.length > 0
      ? this.customNotesResult.next(customNotesSearchResult)
      : this.customNotesResult.next([]);
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
