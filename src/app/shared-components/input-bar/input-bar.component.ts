import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss'],
})
export class InputBarComponent {
  newNoteText: string = '';
  isOpened: boolean = false;
  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;

  input(e: any) {
    this.newNoteText = e.srcElement.innerText;
  }

  openSection() {
    this.isOpened = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 10);
  }
  closeSection() {
    this.isOpened = false;
  }
}
