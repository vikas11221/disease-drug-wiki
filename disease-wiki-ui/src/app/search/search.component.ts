import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: any;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  search(event: any) {
    this.searchService.search(event).subscribe(({ data }) => {
      this.searchResults = data.knowledgeBase;
    });
  }
}
