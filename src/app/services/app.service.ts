import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';

@Injectable()
export class AppService {
  onThemeChanged = new BehaviorSubject<Theme>(Theme.light);
}

export enum Theme {
  light,
  dark,
}
