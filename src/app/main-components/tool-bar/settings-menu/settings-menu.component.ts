import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tool-bar-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent {
  @Output() onThemeChanged = new EventEmitter<void>();
  @Input() isDarkMode = false;

  toggleDarkMode() {
    this.onThemeChanged.emit();
    this.isDarkMode = !this.isDarkMode;
  }
}
