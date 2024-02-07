import { Component, OnInit } from '@angular/core';
import { BrowseService } from './browse.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})

export class BrowseComponent implements OnInit {
  types: any[] = [];
  items: any[] = [];
  title: string = '';
  type: string = '';
  city: string = '';
  bedrooms: number | null = null;
  bathrooms: number | null = null;
  garages: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minSize: number | null = null;
  maxSize: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;    

  constructor(private BrowseService : BrowseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.BrowseService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    ) 
    this.route.queryParams.subscribe(params => {
      this.browseItems(
        params['title'],
        params['type'],
        params['city'],
        null,
        null,
        null,
        params['minPrice'],
        params['maxPrice'],
        null,
        null,
        null,
        null
      )
    })
  }

  browseItems(
  title: string, 
  type: string, 
  city: string, 
  bedrooms: number | null, 
  bathrooms: number | null, 
  garages: number | null, 
  minPrice: number | null, 
  maxPrice: number | null, 
  minSize: number | null, 
  maxSize: number | null, 
  minArea: number | null, 
  maxArea: number | null) {
    this.BrowseService.searchItem(title, type, city, bedrooms, bathrooms, garages, minPrice, maxPrice, minSize, maxSize, minArea, maxArea).subscribe(
      data => {
        this.items = data
        console.log(data);
      },
      error => {
        console.error('Error fetching types', error);
      }
    )
  }
}
