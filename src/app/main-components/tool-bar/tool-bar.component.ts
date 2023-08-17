import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { SearchService } from 'src/app/pages/search/search.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent {
  @Output()
  onToggleSideNav = new EventEmitter();

  menuIsActive = false;
  searchText: string = '';

  constructor(private searchService: SearchService) {}

  startSearch() {
    this.searchService.search(this.searchText);
  }

  endSearch() {
    this.searchText = '';
    this.searchService.search('');
  }

  toggleSideNav() {
    this.onToggleSideNav.emit();
  }
}
