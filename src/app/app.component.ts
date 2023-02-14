import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkMode = false;

  onToggleSideNav = new Subject<void>();

  toggleSideNav() {
    this.onToggleSideNav.next();
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  switchMode() {
    this.renderer.removeClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );
    this.isDarkMode = !this.isDarkMode;
    this.renderer.addClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );
  }
}

interface Food {
  value: string;
  viewValue: string;
}
