import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class LabelService {
  openEditLabels = new Subject<void>();

  labels: string[] = [];

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  loadLabels() {
    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json'
      )
      .subscribe((labels: any) => {
        this.labels.splice(0);

        if (labels) {
          for (let label of Object.values(labels)) {
            this.labels.push(label as string);
          }
        }
      });
  }

  saveLabels(labels: string[]) {
    this.http
      .put(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json',
        labels
      )
      .subscribe();
  }

  renameLabel(labelToRename: string, newLabel: string) {
    for (let label of this.labels) {
      if (newLabel === label) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    const index = this.labels.indexOf(labelToRename);
    this.labels[index] = newLabel;

    if (
      this.activeRoute.snapshot.children[0].children[0].params['name'] ===
      labelToRename
    ) {
      this.router.navigate(['custom-notes/' + newLabel]);
    }

    this._snackBar.open('Successfully renamed!', 'Close');

    this.saveLabels(this.labels);
  }

  deleteLabel(label: string) {
    const index = this.labels.indexOf(label);

    if (index !== -1) {
      this.labels.splice(index, 1);
    }

    this.saveLabels(this.labels);
  }

  createNewLabel(newLabel: string) {
    if (newLabel.trim() === '') return;

    for (let label of this.labels) {
      if (newLabel === label) {
        this._snackBar.open('Wrong name.', 'Close');
        return;
      }
    }

    this.labels.push(newLabel);

    this.saveLabels(this.labels);
  }
}
