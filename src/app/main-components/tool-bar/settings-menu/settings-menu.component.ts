import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tool-bar-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent {
  @Output() onThemeChanged = new EventEmitter<void>();

  toggleDarkMode() {
    this.onThemeChanged.emit();
  }
}
