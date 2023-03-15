import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DrawService {
  opedDraw = new Subject<void>();
  constructor() {}
}
