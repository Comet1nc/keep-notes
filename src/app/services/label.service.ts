import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  openEditLabels = new Subject<void>();

  labels: string[] = [];

  constructor(private http: HttpClient) {}

  loadLabels() {
    this.http
      .get(
        'https://keep-notes-f33db-default-rtdb.europe-west1.firebasedatabase.app/labels.json'
      )
      .subscribe((labels: any) => {
        this.labels = labels;
        console.log(this.labels);
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
}
