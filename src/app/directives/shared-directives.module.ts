import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoHeightTextareaDirective } from './auto-height-textarea/auto-height-textarea.directive';

@NgModule({
  declarations: [AutoHeightTextareaDirective],
  imports: [CommonModule],
  exports: [AutoHeightTextareaDirective],
})
export class SharedDirectivesModule {}
