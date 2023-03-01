import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { EditNoteService } from './shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  onToggleSideNav = new Subject<void>();

  isSideNavOpened = true;

  showEditMode = false;
  noteToEdit!: Note;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private editNoteService: EditNoteService
  ) {}
  ngOnInit(): void {
    this.editNoteService.onOpenEditMode.subscribe((note: Note) => {
      this.noteToEdit = note;
      this.showEditMode = true;
    });
  }

  closeEditMode() {
    this.editNoteService.onCloseEditMode.next();
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

  switchTheme() {
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
