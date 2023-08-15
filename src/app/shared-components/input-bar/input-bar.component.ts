import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { DrawService } from 'src/app/main-components/draw/draw.service';
import { NoteColor } from 'src/app/models/note-colors.model';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';

@Component({
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.scss'],
})
export class InputBarComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() saveNewNote = new EventEmitter<Note>();
  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;
  setColor$ = new Subject<[NoteColor, HTMLElement]>();

  isOpened: boolean = false;

  noteColor: NoteColor;
  noteIsPinned: boolean = false;

  sub: Subscription;

  form: FormGroup;

  constructor(
    private drawService: DrawService,
    private renderer: Renderer2,
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titleText: [''],
      mainNoteText: [''],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.sub = combineLatest([
      this.appService.appTheme$,
      this.setColor$,
    ]).subscribe(([theme, [color, HTMLElement]]) => {
      this.noteColor = color;

      if (color !== undefined) {
        this.renderer.setStyle(
          HTMLElement,
          'background-color',
          theme === Theme.light ? color.valueLightTheme : color.valueDarkTheme
        );
      } else {
        this.renderer.removeStyle(HTMLElement, 'background-color');
      }
    });
  }

  draw() {
    this.drawService.openDraw.next();
  }

  openSection() {
    this.isOpened = true;
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 10);
  }

  onSubmit(container: HTMLElement) {
    this.isOpened = false;

    let titleText = this.form.get('titleText').value;
    let mainNoteText = this.form.get('mainNoteText').value;

    if (!titleText) titleText = '';
    if (!mainNoteText) mainNoteText = '';

    let newNote = new Note(titleText, mainNoteText);
    newNote.isPinned = this.noteIsPinned;
    newNote.color = this.noteColor;

    this.saveNewNote.emit(newNote);

    this.form.reset();

    this.noteColor = undefined;
    this.setColor$.next([this.noteColor, container]);
  }
}
