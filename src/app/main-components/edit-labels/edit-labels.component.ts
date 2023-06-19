import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss'],
})
export class EditLabelsComponent implements OnInit {
  editLabelsOpened = false;
  newLabelName: string = '';
  labels: string[] = [];

  constructor(
    private labelService: LabelService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.labelService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });

    this.labels = this.labelService.labels;

    this.labelService.loadLabels();
  }

  createNewLabel() {
    if (this.newLabelName.trim() === '') return;

    for (let label of this.labels) {
      if (this.newLabelName === label) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    this.labels.push(this.newLabelName);

    this.labelService.saveLabels(this.labels);
  }

  clearNewLabelName() {
    this.newLabelName = '';
  }

  deleteLabel(label: string) {
    const index = this.labels.indexOf(label);

    if (index !== -1) {
      this.labels.splice(index, 1);
    }

    this.labelService.saveLabels(this.labels);
  }

  renameLabel(input: HTMLInputElement, myLabel: string) {
    for (let label of this.labels) {
      if (input.value === label) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    let oldName = myLabel;
    myLabel = input.value;

    if (
      this.activeRoute.snapshot.children[0].children[0].params['name'] ===
      oldName
    ) {
      this.router.navigate(['custom-notes/' + myLabel]);
    }

    this._snackBar.open('Successfully renamed!', 'Close');

    this.labelService.saveLabels(this.labels);
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
