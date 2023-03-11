import { Component, OnInit } from '@angular/core';
import { EditLabelsService, Label } from './edit-labels.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent implements OnInit {
  editLabelsOpened = false;
  labels!: Label[];
  newLabelName: string = '';

  constructor(private editLabelsService: EditLabelsService) {}

  ngOnInit(): void {
    this.editLabelsService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });

    this.labels = this.editLabelsService.labels;
  }

  createNewLabel() {
    if (this.newLabelName.trim() === '') return;

    this.editLabelsService.addLabel(this.newLabelName);
  }

  clearNewLabelName() {
    this.newLabelName = '';
  }

  deleteLabel(label: Label) {
    this.editLabelsService.deleteLabel(label);
  }

  renameLabel() {
    this.editLabelsService.renameLabel();
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
