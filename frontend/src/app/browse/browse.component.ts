import { Component } from '@angular/core';
import { BrowseService } from './browse.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
  ],
  styleUrl: './browse.component.css',
})

export class BrowseComponent {
  types : any[] = [];
  items : any[] = [];

  noWrapSlides = false;
  showIndicator = true;
  isAnimated = true;
  itemsPerSlide = 3;

  disabledField : boolean = true;
  typeSelect = 'All Types'; 

  constructor(private BrowseService : BrowseService) { }

  ngOnInit(): void {
    this.BrowseService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    )
  }
}
