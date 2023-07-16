import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { Subscription, delay } from 'rxjs';
import { EditNoteService } from '../edit-note/edit-note.service';

@Component({
  selector: 'app-note-field',
  templateUrl: './note-field.component.html',
  styleUrls: ['./note-field.component.scss'],
  animations: [
    trigger('icons', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate(
          '200ms ease-in',
          style({
            opacity: '1',
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: '1',
        }),
        animate(
          '300ms ease-out',
          style({
            opacity: '0',
          })
        ),
      ]),
    ]),
  ],
})
export class NoteFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() note!: Note;
  @Output() onDeleteLabel = new EventEmitter<string>();
  @Output() startEditNote = new EventEmitter<void>();

  @ViewChild('noteRef') noteRef!: ElementRef<HTMLElement>;

  showButtons = false;
  mouseInNote = false;
  currentTheme: Theme = Theme.light;

  subs: Subscription[] = [];

  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private editNoteService: EditNoteService
  ) {}

  ngAfterViewInit(): void {
    this.changeBg(this.noteRef.nativeElement);
    let sub = this.appService.appTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.changeBg(this.noteRef.nativeElement);
    });

    let sub2 = this.editNoteService.onBgChanged.pipe(delay(0)).subscribe(() => {
      this.changeBg(this.noteRef.nativeElement);
    });

    this.subs.push(sub, sub2);
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {}

  deleteLabel(label: string) {
    this.onDeleteLabel.emit(label);
  }

  changeBg(noteRef: HTMLElement) {
    if (this.note.color !== undefined) {
      this.renderer.setStyle(
        noteRef,
        'background-color',
        this.currentTheme === Theme.light
          ? this.note.color.valueLightTheme
          : this.note.color.valueDarkTheme
      );
    } else {
      this.renderer.removeStyle(noteRef, 'background-color');
    }
  }

  openEditMode() {
    if (this.mouseInNote) {
      this.startEditNote.emit();
    }
  }

  onMouseEnter(noteRef: HTMLElement) {
    this.showButtons = true;
    this.mouseInNote = true;
  }

  onMouseLeave(noteRef: HTMLElement) {
    this.showButtons = false;
    this.mouseInNote = false;
  }

  getTitle() {
    let clearedText = this.note.title.trim();
    if (clearedText.length === 0) {
      return 'No title';
    }
    return clearedText;
  }

  getContent() {
    let clearedText = this.note.content.trim();
    if (clearedText.length === 0) {
      return '';
    }
    if (this.note.content.length > 45) {
      let slicedText = this.note.content.slice(0, 45);
      let textWithDots = slicedText + '...';
      return textWithDots;
    }
    return clearedText;
  }
}
