import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Note, NoteCategory } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';

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
export class NoteFieldComponent implements OnInit, OnDestroy {
  @Input() note!: Note;
  @Input() index!: number;
  @Input() onNotesChanged!: Observable<void>;
  @Input() categoryType!: NoteCategory;
  onNotesChangedSub!: Subscription;
  @Output() onMakePinned = new EventEmitter<Note>();

  editmode = 'editmode';

  showButtons = false;
  mouseInNote = false;
  editModeOpened = false;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.note.index = this.index;

    this.notesService.closeEditMode.subscribe(
      (note) => (this.editModeOpened = false)
    );

    // this.onNotesChangedSub = this.onNotesChanged.subscribe(() => {
    //   this.note.index = this.index;
    // });
  }

  ngOnDestroy(): void {
    // this.onNotesChangedSub.unsubscribe();
  }

  makePinned() {
    this.onMakePinned.emit(this.note);
  }

  openEditMode() {
    if (this.mouseInNote) {
      this.note.fromCategory = this.categoryType;
      this.note.index = this.index;
      this.notesService.openEditMode.next(this.note);
      this.editModeOpened = true;
    }
  }

  onMouseEnter() {
    this.showButtons = true;
    this.mouseInNote = true;
  }

  onMouseLeave() {
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
