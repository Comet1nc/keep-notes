import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: any;

  @Input() sub!: Observable<void>;

  closed = true;

  ngAfterViewInit(): void {
    this.sub.subscribe(() => {
      this.drawer.toggle();
    });
  }
  // @Input() showFiller = false;
}
