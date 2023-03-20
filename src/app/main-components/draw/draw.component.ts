import { Component, OnInit } from '@angular/core';
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

  inEraseMode = false;

  palleteIsOpened = false;

  selectedTool: drawTool = drawTool.brush;

  constructor(private drawService: DrawService) {}

  ngOnInit(): void {
    this.drawService.openDraw.subscribe(() => {
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
        s.background('white');
        // s.background('#FAFAFA');
        s.strokeWeight(this.defaultStrokeWeight);

        s.stroke(this.currentBrushColor);
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          } else if (s.mouseButton === s.CENTER) {
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

    this.canvas.strokeWeight(this.currentBrushWeight);
    if (this.selectedTool !== drawTool.eraser) {
      this.canvas.stroke(this.currentBrushColor);
    }

    this.palleteIsOpened = false;
    this.canvas.stroke();
  }

  selectBrush() {
    this.canvas.strokeWeight(this.currentBrushWeight);
    this.canvas.stroke(this.currentBrushColor);

    this.selectedTool = drawTool.brush;
  }

  erase() {
    this.selectedTool = drawTool.eraser;
    this.canvas.stroke('white');
  }

  clearCanvas() {
    this.canvas.clear();
    this.canvas.background('white');
  }

  save() {
    this.canvas.saveCanvas('12345', 'jpg');
  }

  closeDraw() {
    this.drawOpened = false;
  }
}

enum drawTool {
  brush = 'brush',
  eraser = 'eraser',
}
