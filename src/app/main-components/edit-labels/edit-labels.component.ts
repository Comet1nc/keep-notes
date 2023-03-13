import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private editLabelsService: EditLabelsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

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

  renameLabel(input: HTMLInputElement, myLabel: Label) {
    for (let label of this.labels) {
      if (input.value === label.name) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    let oldName = myLabel.name;
    myLabel.name = input.value;

    if (
      this.activeRoute.snapshot.children[0].children[0].params['name'] ===
      oldName
    ) {
      this.router.navigate(['custom-notes/' + myLabel.name]);
    }

    this._snackBar.open('Successfully renamed!', 'Close');

    this.editLabelsService.labelRenamed();
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
