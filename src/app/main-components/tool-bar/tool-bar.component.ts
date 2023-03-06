import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarService } from './search-bar.service';

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

  menuIsActive = false;
  searchText: string = '';

  constructor(private searchBarService: SearchBarService) {}

  search() {
    this.searchBarService.search(this.searchText);
  }

  toggleDarkMode() {
    this.switchDarkMode.emit();
  }

  toggleSideNav() {
    this.onToggleSideNav.emit();
  }
}
// d
