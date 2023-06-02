import { Component, EventEmitter, Output } from '@angular/core';
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
  isDarkMode = false;

  constructor(private searchBarService: SearchBarService) {}

  search() {
    if (this.searchText === '' && this.searchBarService.searching === true) {
      this.endSearch();
    } else {
      this.searchBarService.search(this.searchText);
    }
  }

  endSearch() {
    this.searchBarService.endSearch.next();
    this.searchBarService.searching = false;
    this.searchText = '';
  }

  toggleDarkMode() {
    this.switchDarkMode.emit();
    this.isDarkMode = !this.isDarkMode;
  }

  toggleSideNav() {
    this.onToggleSideNav.emit();
  }
}
