import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes/notes.component';
import { SideNavComponent } from './side-nav.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { EditLabelsComponent } from './components/edit-labels/edit-labels.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { BinComponent } from './components/bin/bin.component';

@NgModule({
  declarations: [SideNavComponent, NotesComponent, RemindersComponent, EditLabelsComponent, ArchiveComponent, BinComponent],
  imports: [CommonModule],
  exports: [SideNavComponent],
})
export class SideNavModule {}
