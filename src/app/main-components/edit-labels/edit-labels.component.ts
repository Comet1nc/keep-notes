import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent implements OnInit {
  editLabelsOpened = false;
  newLabel: string = '';
  labels: string[] = [];

  constructor(private labelService: LabelService) {}

  ngOnInit(): void {
    this.labelService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });

    this.labels = this.labelService.labels;

    this.labelService.loadLabels();
  }

  createNewLabel() {
    this.labelService.createNewLabel(this.newLabel);
  }

  clearNewLabelName() {
    this.newLabel = '';
  }

  deleteLabel(label: string) {
    this.labelService.deleteLabel(label);
  }

  renameLabel(input: HTMLInputElement, myLabel: string) {
    this.labelService.renameLabel(myLabel, input.value);
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
