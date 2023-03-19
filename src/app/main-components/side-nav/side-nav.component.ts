import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CustomNotesService,
  Label,
} from 'src/app/services/custom-notes.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sub!: Observable<void>;

  @Input() isSideNavOpened = true;

  customLabels: Label[] = [];

  constructor(
    private route: ActivatedRoute,
    private customNotes: CustomNotesService
  ) {}

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });

    this.customLabels = this.customNotes.labels;
  }

  getClassByState() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }
}
