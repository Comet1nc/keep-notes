import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { EditNoteService } from './edit-note.service';
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  startWith,
  take,
} from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  animations: [
    trigger('note', [
      transition(':enter', [
        style({
          opacity: '0',
          transform: 'scale(0.5)',
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: '1',
            transform: '*',
          })
        ),
      ]),
    ]),
    trigger('bg', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate(
          '400ms ease-in-out',
          style({
            opacity: '1',
          })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditNoteComponent implements OnInit, OnDestroy {
  @Input() noteForEdit$: Observable<Note>;
  @Input() canEditNote = false;
  @Output() updateNote = new EventEmitter<Note>();
  @Output() onDeleteLabel = new EventEmitter<string>();

  bg$: Observable<string>;
  subs: Subscription[] = [];
  form: FormGroup;

  constructor(
    private editNoteService: EditNoteService,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.bg$ = combineLatest([
      this.appService.appTheme$,
      this.noteForEdit$,
      this.editNoteService.onBgChanged.pipe(startWith(0)),
    ]).pipe(
      map(([theme, note]) => {
        if (note && note.color) {
          return theme === Theme.light
            ? note.color.valueLightTheme
            : note.color.valueDarkTheme;
        } else {
          return '';
        }
      })
    );

    this.noteForEdit$.pipe(take(1)).subscribe((note) => {
      if (!note) return;
      this.form = this.formBuilder.group({
        titleText: [note.title],
        mainNoteText: [note.content],
      });
    });

    let sub = this.editNoteService.closeEditMode.subscribe(() => {
      this.onSubmit();
    });

    this.subs.push(sub);
  }

  deleteLabel(label: string) {
    this.onDeleteLabel.emit(label);
  }

  onSubmit() {
    const titleText = this.form.get('titleText').value;
    const mainNoteText = this.form.get('mainNoteText').value;

    let oldNote;
    this.noteForEdit$.pipe(take(1)).subscribe((note) => (oldNote = note));

    const newNote: Note = {
      ...oldNote,
      title: titleText,
      content: mainNoteText,
      lastEditAt: new Date(),
    };

    this.form.reset();
    this.updateNote.emit(newNote);
  }
}
