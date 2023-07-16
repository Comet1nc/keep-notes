import { AngularMaterialModule } from 'src/app/modules/angular-material.module';
import { SearchRoutingModule } from './search-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { SearchComponent } from './search.component';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@NgModule({
  declarations: [SearchComponent],
  providers: [EditNoteService],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    SharedComponentsModule,
    AngularMaterialModule,
  ],
})
export class SearchModule {}
