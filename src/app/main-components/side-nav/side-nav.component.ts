import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EditLabelsService, Label } from '../edit-labels/edit-labels.service';

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
    private editLabelsService: EditLabelsService
  ) {}

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });

    this.customLabels = this.editLabelsService.labels;
  }

  getClassByState() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }
}
