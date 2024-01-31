import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  types: any[] = [];

  // selectedItem: any

  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
    this.searchService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    )

  }
}
