import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchByPhrase$ = new BehaviorSubject<string>('');

  lastSearchText: string = '';

  constructor(private router: Router) {}

  search(searchText: string) {
    if (searchText.length < 1) {
      this.router.navigate(['notes']);
      return;
    }

    this.router.navigate(['search']);

    console.log(searchText);

    this.searchByPhrase$.next(searchText);
  }
}
