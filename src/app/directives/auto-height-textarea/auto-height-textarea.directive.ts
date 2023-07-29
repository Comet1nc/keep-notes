import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autoResize]',
})
export class AutoHeightTextareaDirective {
  @Input() minHeight = 30;
  @Input() lineHeight = 17;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement): void {
    this.adjustHeight();
  }

  private adjustHeight() {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;

    textarea.style.height = this.calcHeight(textarea.value) + 'px';
  }

  private calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height
    let newHeight = this.minHeight + numberOfLineBreaks * this.lineHeight;
    return newHeight;
  }
}
