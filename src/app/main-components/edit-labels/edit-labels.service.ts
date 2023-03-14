import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable()
export class EditLabelsService {
  openEditLabels = new Subject<void>();
  labels: Label[] = [new Label('one'), new Label('two')];

  addLabel(name: string) {
    this.labels.push(new Label(name));
  }

  labelRenamed() {
    return;
  }

  getLabelByName(name: string) {
    for (let label of this.labels) {
      if (label.name === name) {
        return label;
      }
    }

    return new Label('');
  }

  deleteLabel(label: Label) {
    let index = this.labels.indexOf(label);

    if (this.labels.length === 1) {
      this.labels.pop();
    } else if (index === 0) {
      this.labels.shift();
    } else if (index + 1 === this.labels.length) {
      this.labels.pop();
    } else {
      this.labels.splice(index, 1);
    }
  }
}

export class Label {
  name: string;
  notes!: Note[];
  notesPinned!: Note[];

  constructor(private _name: string) {
    this.name = _name;
  }
}
