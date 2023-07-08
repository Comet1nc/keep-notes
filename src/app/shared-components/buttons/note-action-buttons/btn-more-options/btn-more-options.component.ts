import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, combineLatest, debounceTime, map } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import * as fromApp from '../../../../store/app.reducer';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-btn-more-options',
  templateUrl: './btn-more-options.component.html',
  styleUrls: ['./btn-more-options.component.scss', '../action-buttons.scss'],
})
export class BtnMoreOptionsComponent implements OnInit {
  moreOptionsActive = false;
  editLabelsMenuActive = false;
  searchLabel$ = new Subject<Event>();
  @Output() deleteNote = new EventEmitter<void>();
  @Output() onDeleteLabel = new EventEmitter<string>();
  @Output() onAddLabel = new EventEmitter<string>();
  @Input() note!: Note;

  labels$ = combineLatest([
    this.store.select('labels').pipe(map((state) => state.labels)),
    this.searchLabel$.pipe(
      debounceTime(300),
      map((event: Event) => {
        return (event.target as HTMLInputElement).value;
      }),
      startWith('')
    ),
  ]).pipe(
    map(([labels, inputValue]) => {
      if (inputValue === '') {
        return labels;
      } else {
        let result = labels.filter((value) => value.includes(inputValue));
        return result;
      }
    })
  );

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.moreOptionsActive = !this.moreOptionsActive;
  }

  openEditLabels() {
    this.editLabelsMenuActive = true;
    this.moreOptionsActive = false;
  }

  check(label: string) {
    if (this.note.labels) {
      return this.note?.labels.includes(label);
    } else {
      return false;
    }
  }

  changeLabel(label: string) {
    if (this.note.labels && this.note?.labels.includes(label)) {
      this.onDeleteLabel.next(label);
    } else {
      this.onAddLabel.next(label);
    }
  }
}
