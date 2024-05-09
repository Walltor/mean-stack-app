import { Component, OnInit } from '@angular/core'
import { SearchService } from './search.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  types: any[] = []
  items: any[] = []
  title: string = ''
  itemTypes: string = ''
  city: string = ''
  minPrice: number | null = null
  maxPrice: number | null = null

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.searchService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
  }

  search() {
    this.router.navigate(['/browse'], { queryParams: { title: this.title, types: this.itemTypes, city: this.city, minPrice: this.minPrice, maxPrice: this.maxPrice } })
  }
}
