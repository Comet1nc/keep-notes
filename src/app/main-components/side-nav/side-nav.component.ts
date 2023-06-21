import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sub!: Observable<void>;

  @Input() isSideNavOpened = true;

  labels: string[] = [];

  constructor(private labelService: LabelService) {}

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });

    this.labels = this.labelService.labels;

    this.labelService.loadLabels();
  }

  getClassByState() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }
}
