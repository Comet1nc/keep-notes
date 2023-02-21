import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBarComponent } from './input-bar/input-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputBarComponent],
})
export class SharedComponentsModule {}
