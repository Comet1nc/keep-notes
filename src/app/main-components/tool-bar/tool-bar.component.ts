import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/pages/search/search.service';

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

  constructor(private searchService: SearchService) {}

  startSearch() {
    if (this.searchText === '' && this.searchService.searching === true) {
      this.endSearch();
    } else {
      // this.searchBarService.search(this.searchText);
      this.searchService.search(this.searchText);
    }
  }

  endSearch() {
    // this.searchService.endSearch.next();
    // const newLocal = this;
    // newLocal.searchService.searching = false;
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
