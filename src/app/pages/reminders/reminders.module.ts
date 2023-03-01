import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersComponent } from './reminders.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { NotesService } from 'src/app/services/notes.service';

@NgModule({
  declarations: [RemindersComponent],
  providers: [NotesService],
  imports: [CommonModule, RemindersRoutingModule, SharedComponentsModule],
})
export class RemindersModule {}
