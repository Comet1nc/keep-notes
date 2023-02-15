import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sub!: Observable<void>;

  isSideNavOpened = false;

  ngOnInit(): void {
    this.sub.subscribe(() => {
      this.isSideNavOpened = !this.isSideNavOpened;
    });
  }

  getClassByState() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }
}
