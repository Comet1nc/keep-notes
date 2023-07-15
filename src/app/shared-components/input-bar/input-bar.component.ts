import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
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
export class InputBarComponent implements AfterViewInit, OnDestroy {
  @Output() saveNewNote = new EventEmitter<Note>();
  @ViewChild('inputField') inputField!: ElementRef<HTMLElement>;
  setColor$ = new Subject<[NoteColor, HTMLElement]>();

  isOpened: boolean = false;

  noteColor: NoteColor;
  noteIsPinned: boolean = false;
  titleText: string = '';
  mainNoteText: string = '';

  sub: Subscription;

  constructor(
    private drawService: DrawService,
    private renderer: Renderer2,
    private appService: AppService
  ) {}

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

  input(e: any) {
    this.mainNoteText = e.srcElement.innerText;
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

  closeSection(inputField: HTMLDivElement, container: HTMLElement) {
    this.isOpened = false;

    if (this.titleText.length === 0 && this.mainNoteText.length === 0) {
      return;
    }

    let newNote = new Note(this.titleText, this.mainNoteText);
    newNote.isPinned = this.noteIsPinned;
    newNote.color = this.noteColor;

    // saving
    this.saveNewNote.emit(newNote);

    // clearing input fields
    this.titleText = '';
    this.mainNoteText = '';
    inputField.innerText = '';
    this.noteColor = undefined;

    this.setColor$.next([undefined, container]);
  }
}
