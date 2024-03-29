import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  onToggleSideNav = new Subject<void>();

  isSideNavOpened = true;

  constructor() {}

  toggleSideNav() {
    this.onToggleSideNav.next();
    this.isSideNavOpened = !this.isSideNavOpened;
  }
}
