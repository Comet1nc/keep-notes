import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomNotesRoutingModule } from './custom-notes-routing.module';
import { CustomNotesComponent } from './custom-notes.component';


@NgModule({
  declarations: [
    CustomNotesComponent
  ],
  imports: [
    CommonModule,
    CustomNotesRoutingModule
  ]
})
export class CustomNotesModule { }
