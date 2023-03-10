import { Component, OnInit } from '@angular/core';
import { EditLabelsService } from './edit-labels.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent {
  editLabelsOpened = false;
  labels: Label[] = [new Label('one'), new Label('two')];

  constructor(private editLabelsService: EditLabelsService) {
    editLabelsService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}

class Label {
  name: string;
  constructor(private _name: string) {
    this.name = _name;
  }
}
