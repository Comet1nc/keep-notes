import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CustomNotesService,
  Label,
} from 'src/app/services/custom-notes.service';

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
    private customNotesService: CustomNotesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customNotesService.openEditLabels.subscribe(() => {
      this.editLabelsOpened = true;
    });
    this.labels = this.customNotesService.labels;

    if (!this.customNotesService.filled) {
      this.customNotesService.loadDataFromLocalStorage();
    }
  }

  createNewLabel() {
    if (this.newLabelName.trim() === '') return;

    for (let label of this.labels) {
      if (this.newLabelName === label.name) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    this.customNotesService.addLabel(this.newLabelName);
  }

  clearNewLabelName() {
    this.newLabelName = '';
  }

  deleteLabel(label: Label) {
    this.customNotesService.deleteLabel(label);
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

    this.customNotesService.labelRenamed();
  }

  closeEditLabels() {
    this.editLabelsOpened = false;
  }
}
