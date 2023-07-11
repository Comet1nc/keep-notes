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
import { Observable, Subscription } from 'rxjs';

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
  @ViewChild('noteRef') noteHTML!: ElementRef<HTMLElement>;
  @ViewChild('inputField') inputField!: ElementRef;
  @Input() noteForEdit$: Observable<Note>;
  @Input() canEditNote = false;
  @Output() updateNote = new EventEmitter<Note>();
  @Output() onDeleteLabel = new EventEmitter<string>();

  noteForEdit: Note;
  newNoteTitle: string = '';
  newNoteContent: string = '';
  subs: Subscription[] = [];
  currentTheme: Theme = Theme.light;

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
    let sub1 = this.noteForEdit$.subscribe((note) => {
      if (!note) return;
      this.noteForEdit = note;
      this.newNoteTitle = this.noteForEdit.title;
      this.newNoteContent = this.noteForEdit.content;
    });

    let sub2 = this.editNoteService.closeEditMode.subscribe(() =>
      this.closeEditMode()
    );

    this.subs.push(sub1, sub2);
  }

  ngAfterViewInit(): void {
    this.renderer.setProperty(
      this.inputField.nativeElement,
      'innerText',
      this.noteForEdit.content
    );

    this.setupBg(this.noteHTML.nativeElement);

    const sub1 = this.appService.appTheme$.subscribe((theme) => {
      this.currentTheme = theme;

      this.setupBg(this.noteHTML.nativeElement);
    });

    const sub2 = this.editNoteService.onBgChanged.subscribe(() => {
      this.setupBg(this.noteHTML.nativeElement);
    });

    this.subs.push(sub1, sub2);
  }

  deleteLabel(label: string) {
    this.onDeleteLabel.emit(label);
  }

  setupBg(noteRef: HTMLElement) {
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
