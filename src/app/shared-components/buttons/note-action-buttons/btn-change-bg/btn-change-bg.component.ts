import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { NoteColor, noteColors } from 'src/app/models/note-colors.model';
import { Note } from 'src/app/models/note.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-btn-change-bg',
  templateUrl: './btn-change-bg.component.html',
  styleUrls: ['./btn-change-bg.component.scss', '../action-buttons.scss'],
})
export class BtnChangeBgComponent implements OnInit {
  @Input() note!: Note;
  @Output() saveData = new EventEmitter<void>();

  currentTheme: Theme = Theme.light;
  colors = noteColors;
  changeBgMenuActive = false;

  constructor(
    private appService: AppService,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {
    this.appService.onThemeChanged.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  setBg(color: any) {
    this.note.color = color;

    this.saveData.emit();

    this.editNoteService.onBgChanged.next();
  }
}
