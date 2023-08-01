import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable()
export class AppService {
  appTheme$ = new BehaviorSubject<Theme>(Theme.light);
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  switchTheme() {
    this.appTheme$.pipe(take(1)).subscribe((theme) => {
      if (theme === Theme.dark) {
        this.renderer.removeClass(this.document.body, 'theme-dark');

        this.renderer.addClass(this.document.body, 'theme-light');

        this.appTheme$.next(Theme.light);
      } else {
        this.renderer.removeClass(this.document.body, 'theme-light');

        this.renderer.addClass(this.document.body, 'theme-dark');

        this.appTheme$.next(Theme.dark);
      }
    });
  }
}

export enum Theme {
  light,
  dark,
}
