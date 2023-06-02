import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  onThemeChanged = new BehaviorSubject<Theme>(Theme.light);
}

export enum Theme {
  light,
  dark,
}
