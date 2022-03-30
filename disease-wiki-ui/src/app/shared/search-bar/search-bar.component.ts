import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  search(event: any) {
    this.searchEvent.emit(event.target.value);
  }
}
