import { Component } from '@angular/core';
import { FeaturedService } from './featured.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
  ],
  styleUrl: './featured.component.css',
})

export class FeaturedComponent {
  items : any[] = [];

  noWrapSlides = false;
  showIndicator = true;
  isAnimated = true;
  itemsPerSlide = 3;

  constructor(private FeaturedService : FeaturedService) { }

  ngOnInit(): void {
    this.FeaturedService.getItems().subscribe(
      data => {
        this.items = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    )
  }
}
