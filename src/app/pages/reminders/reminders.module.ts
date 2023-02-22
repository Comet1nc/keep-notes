import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersComponent } from './reminders.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';

@NgModule({
  declarations: [RemindersComponent],
  imports: [CommonModule, RemindersRoutingModule, SharedComponentsModule],
})
export class RemindersModule {}
