import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DrawService {
  openDraw = new Subject<void>();
  constructor() {}
}
