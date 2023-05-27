import { Component } from '@angular/core';
import { DrawService } from 'src/app/main-components/draw/draw.service';

@Component({
  selector: 'app-btn-draw',
  templateUrl: './btn-draw.component.html',
  styleUrls: ['./btn-draw.component.scss', '../action-buttons.scss'],
})
export class BtnDrawComponent {
  constructor(private drawService: DrawService) {}
  draw() {
    this.drawService.openDraw.next();
  }
}
