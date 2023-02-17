import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinRoutingModule } from './bin-routing.module';
import { BinComponent } from './bin.component';


@NgModule({
  declarations: [
    BinComponent
  ],
  imports: [
    CommonModule,
    BinRoutingModule
  ]
})
export class BinModule { }
