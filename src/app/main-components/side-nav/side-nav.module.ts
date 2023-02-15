import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes/notes.component';
import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [SideNavComponent, NotesComponent],
  imports: [CommonModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
