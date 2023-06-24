import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-btn-more-options',
  templateUrl: './btn-more-options.component.html',
  styleUrls: ['./btn-more-options.component.scss', '../action-buttons.scss'],
})
export class BtnMoreOptionsComponent implements OnInit {
  allLabels: string[] = [];
  moreOptionsActive = false;
  editLabelsMenuActive = false;
  searchLabel = new Subject<Event>();
  @Output() deleteNote = new EventEmitter<void>();
  @Output() onDeleteLabel = new EventEmitter<string>();
  @Output() onAddLabel = new EventEmitter<string>();
  @Input() note!: Note;

  constructor(private labelsService: LabelService) {}

  ngOnInit(): void {
    this.allLabels = this.labelsService.labels;

    this.searchLabel.pipe(debounceTime(300)).subscribe((event: any) => {
      if (event.target.value.length > 0) {
        let result = this.labelsService.labels.filter(
          (value) =>
            value === event.target.value || value.includes(event.target.value)
        );

        this.allLabels = [];
        this.allLabels = result;
      } else {
        this.allLabels = this.labelsService.labels;
      }
    });
  }

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
    }

    return false;
  }

  changeLabel(label: string) {
    if (this.note.labels && this.note?.labels.includes(label)) {
      this.onDeleteLabel.next(label);
    } else {
      this.onAddLabel.next(label);
    }
  }
}
