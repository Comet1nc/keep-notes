import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  @Output()
  switchDarkMode = new EventEmitter();
  @Output()
  onToggleSideNav = new EventEmitter();

  toggleDarkMode() {
    this.switchDarkMode.emit();
  }

  toggleSideNav() {
    this.onToggleSideNav.emit();
  }
}
