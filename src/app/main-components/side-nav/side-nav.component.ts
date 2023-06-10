import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from 'src/app/models/label.model';
import { CustomNotesService } from 'src/app/services/custom-notes.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sub!: Observable<void>;

  @Input() isSideNavOpened = true;

  customLabels: Label[] = [];

  constructor(private customNotes: CustomNotesService) {}

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
