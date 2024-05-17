import { Component } from '@angular/core'
import { FeaturedService } from './featured.service'
import { ActivatedRoute, Router } from '@angular/router'
import { formatNumber } from '@angular/common'

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css',
})

export class FeaturedComponent {
  types: any[] = []
  items: any[] = []
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    infinite: false,
    prevArrow: '.prev',
    nextArrow: '.next'
  }

  constructor(
    private FeaturedService: FeaturedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.FeaturedService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
    this.FeaturedService.getFeatured().subscribe(
      data => {
        this.items = data
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].size) {
            this.items[index].size = formatNumber(Number(this.items[index].size), 'en-US', '1.0-0')
          }
          if (this.items[index].area) {
            this.items[index].area = formatNumber(Number(this.items[index].area), 'en-US', '1.0-0')
          }
          this.items[index].price = formatNumber(Number(this.items[index].price), 'en-US', '1.0-0')
        }
        console.log(data)
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
  }

  viewDetails(id: number) {
    this.router.navigate(['item-details/', id])
  }

  handleImageError(event: any) {
    event.target.src = "../../assets/image.svg"
  }
}