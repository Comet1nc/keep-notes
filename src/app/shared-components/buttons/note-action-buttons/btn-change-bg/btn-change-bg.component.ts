import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteColor, noteColors } from 'src/app/models/note-colors.model';
import { AppService, Theme } from 'src/app/services/app.service';
import { EditNoteService } from 'src/app/shared-components/edit-note/edit-note.service';

@Component({
  selector: 'app-btn-change-bg',
  templateUrl: './btn-change-bg.component.html',
  styleUrls: ['./btn-change-bg.component.scss', '../action-buttons.scss'],
})
export class BtnChangeBgComponent implements OnInit {
  @Output() setNoteColor = new EventEmitter<NoteColor>();

  currentTheme: Theme = Theme.light;
  colors = noteColors;
  changeBgMenuActive = false;

  constructor(
    private appService: AppService,
    private editNoteService: EditNoteService
  ) {}

  ngOnInit(): void {
    this.appService.appTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  toggleBgMenu() {
    this.changeBgMenuActive = !this.changeBgMenuActive;
  }

  setBg(color: any) {
    this.setNoteColor.emit(color);

    this.editNoteService.onBgChanged.next();
  }
}
