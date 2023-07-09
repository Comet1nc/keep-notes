import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService, Theme } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkMode = false;

  onToggleSideNav = new Subject<void>();

  isSideNavOpened = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private appService: AppService
  ) {}

  toggleSideNav() {
    this.onToggleSideNav.next();
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  getContentClass() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }

  switchTheme() {
    this.renderer.removeClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );

    this.isDarkMode = !this.isDarkMode;

    this.renderer.addClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );

    this.appService.appTheme$.next(this.isDarkMode ? Theme.dark : Theme.light);
  }
}
