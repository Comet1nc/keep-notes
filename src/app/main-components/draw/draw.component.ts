import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DrawService } from './draw.service';
import p5 from 'p5';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements OnInit {
  drawOpened: boolean = false;

  canvas: any;
  defaultStrokeWeight = 5;

  currentBrushColor: string = 'black';
  currentBrushWeight: number = 5;

  palleteIsOpened = false;

  constructor(private drawService: DrawService) {}

  ngOnInit(): void {
    this.drawService.opedDraw.subscribe(() => {
      this.drawOpened = true;
      setTimeout(() => {
        this.initSketch();
      }, 100);
    });
  }

  initSketch() {
    const sketch = (s: any) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight - 70);

        canvas2.parent('sketch-holder');

        // s.background('#FAFAFA');
        s.strokeWeight(this.defaultStrokeWeight);

        s.stroke(this.currentBrushColor);
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          } else if (s.mouseButton === s.CENTER) {
            s.background(255);
          }
        }
      };
    };

    this.canvas = new p5(sketch);
  }

  openPalettte() {
    this.palleteIsOpened = !this.palleteIsOpened;
    this.canvas.noStroke();
  }

  changeBrush(colorInput: HTMLInputElement, weightInput: HTMLInputElement) {
    this.currentBrushColor = colorInput.value;
    this.currentBrushWeight = +weightInput.value;

    this.selectBrush();

    this.palleteIsOpened = false;
    this.canvas.stroke();
  }

  selectBrush() {
    this.canvas.strokeWeight(this.currentBrushWeight);
    this.canvas.stroke(this.currentBrushColor);
  }

  erase() {
    this.canvas.stroke('white');
  }

  clearCanvas() {
    this.canvas.clear();
  }

  closeDraw() {
    this.drawOpened = false;
  }
}
