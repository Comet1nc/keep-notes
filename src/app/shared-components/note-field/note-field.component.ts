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
import { EditNoteService } from '../edit-note/edit-note.service';
import { Subscription } from 'rxjs';

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
  editModeOpened = false;
  currentTheme: Theme = Theme.light;

  sub: Subscription;

  constructor(private renderer: Renderer2, private appService: AppService) {}

  ngAfterViewInit(): void {
    this.changeBg(this.noteRef.nativeElement);
    this.sub = this.appService.appTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.changeBg(this.noteRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

      // the component will be re-created in any case after emitting close edit mode func in edit-note.component,
      // and this variable will change the state to what it is by default automatically
      this.editModeOpened = true;
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
