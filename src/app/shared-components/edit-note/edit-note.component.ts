import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { EditNoteService } from './edit-note.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Observable, Subscription, take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
})
export class EditNoteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() noteForEdit$: Observable<Note>;
  noteForEdit: Note;
  @Input() canEditNote = false;
  @Input() store: Store<fromApp.AppState>;

  @Output() updateNote = new EventEmitter<Note>();

  currentTheme: Theme = Theme.light;

  newNoteTitle: string = '';
  newNoteContent: string = '';
  subs: Subscription[] = [];

  constructor(
    private editNoteService: EditNoteService,
    private renderer: Renderer2,
    private appService: AppService
  ) {}

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subs.push(
      this.noteForEdit$.subscribe((note) => (this.noteForEdit = note))
    );
  }

  ngAfterViewInit(): void {
    this.initForm();

    this.changeBg(this.noteRef.nativeElement);

    const sub1 = this.appService.appTheme$.subscribe((theme) => {
      this.currentTheme = theme;

      this.changeBg(this.noteRef.nativeElement);
    });

    const sub2 = this.editNoteService.onBgChanged.subscribe(() => {
      this.changeBg(this.noteRef.nativeElement);
    });

    this.subs.push(sub1, sub2);
  }

  initForm() {
    this.newNoteTitle = this.noteForEdit.title;
    this.newNoteContent = this.noteForEdit.content;

    this.renderer.setProperty(
      this.inputField.nativeElement,
      'innerText',
      this.newNoteContent
    );
  }

  changeBg(noteRef: HTMLElement) {
    if (this.noteForEdit.color !== undefined) {
      this.renderer.setStyle(
        noteRef,
        'background-color',
        this.currentTheme === Theme.light
          ? this.noteForEdit.color.valueLightTheme
          : this.noteForEdit.color.valueDarkTheme
      );
    } else {
      this.renderer.removeStyle(noteRef, 'background-color');
    }
  }

  closeEditMode() {
    const newNote: Note = {
      ...this.noteForEdit,
      title: this.newNoteTitle,
      content: this.newNoteContent,
      lastEditAt: new Date(),
    };

    this.updateNote.emit(newNote);
  }

  input(event: any) {
    this.newNoteContent = event.srcElement.innerText;
  }
}
