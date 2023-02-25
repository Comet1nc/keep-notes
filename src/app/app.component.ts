import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NotesService } from './services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isDarkMode = false;

  onToggleSideNav = new Subject<void>();

  isSideNavOpened = true;

  showEditMode = false;
  noteToEdit!: Note;
  noteIndex!: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private notesService: NotesService
  ) {}
  ngOnInit(): void {
    this.notesService.openEditMode.subscribe((note: Note) => {
      this.noteToEdit = note;
      this.noteIndex = note.index;
      this.showEditMode = true;
    });
  }
  ngAfterViewInit(): void {}

  closeEditMode(note: Note) {
    this.notesService.closeEditMode.next(note);
    this.showEditMode = false;
  }

  toggleSideNav() {
    this.onToggleSideNav.next();
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  getContentClass() {
    if (this.isSideNavOpened) {
      return 'opened';
    } else {
      return 'closed';
    }
  }

  switchMode() {
    this.renderer.removeClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );
    this.isDarkMode = !this.isDarkMode;
    this.renderer.addClass(
      this.document.body,
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );
  }
}
