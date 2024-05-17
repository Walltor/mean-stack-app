import { Component } from '@angular/core';
import { ItemDetailsService } from './item-details.service';
import { ActivatedRoute } from '@angular/router';
import { ObjectId } from 'mongodb';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {

  types: any[] = []
  utilities: any[] = []
  item: any
  itemId: ObjectId | null = null
  overview: boolean | null = true

  slideConfig = {
    slidesToShow: 1,
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
    private ItemDetailsService: ItemDetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ItemDetailsService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      })

    this.route.params.subscribe(
      params => {
        this.itemId = params['id']
        if (this.itemId) {
          this.item = this.getItemDetails(this.itemId)
        }
      }
    )
  }

  getItemDetails(itemId: ObjectId) {
    this.ItemDetailsService.getItem(itemId).subscribe(
      (item) => {
        this.item = item
        if (this.item.size) {
          item.size = formatNumber(Number(item.size), 'en-US', '1.0-0')
        }
        if (this.item.area) {
          item.area = formatNumber(Number(item.area), 'en-US', '1.0-0')
        }
        item.price = formatNumber(Number(item.price), 'en-US', '1.0-0')
      },
      (error) => {
        console.error('Error fetching item.', error)
      }
    )
  }

  toggleView() {
    this.overview = !this.overview
  }

  handleImageError(event: any) {
    event.target.src = "../../assets/image.svg"
  }
}
