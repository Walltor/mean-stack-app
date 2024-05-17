import { Component, OnInit } from '@angular/core'
import { BrowseService } from './browse.service'
import { ActivatedRoute, Router } from '@angular/router'
import { formatNumber } from '@angular/common'

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})

export class BrowseComponent implements OnInit {
  types: any[] = []
  utilities: any[] = []
  items: any[] = []
  title: string = ''
  itemTypes: string = ''
  city: string = ''
  bedrooms: number | null = null
  bathrooms: number | null = null
  minPrice: number | null = null
  maxPrice: number | null = null
  minSize: number | null = null
  maxSize: number | null = null
  minArea: number | null = null
  maxArea: number | null = null
  forsale: boolean | null = null
  garage: boolean | null = false
  parking: boolean | null = false
  pool: boolean | null = false
  gym: boolean | null = false
  centralHeating: boolean | null = false
  internet: boolean | null = false
  itemUtilities: string[] = []
  showUtilities: boolean | null = false

  constructor(private BrowseService: BrowseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.BrowseService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
    this.BrowseService.getUtilites().subscribe(
      data => {
        this.utilities = data
      },
      error => {
        console.error('Error fetching utilities', error)
      }
    )
    this.route.queryParams.subscribe(params => {
      this.browseItems(
        params['title'],
        params['types'],
        params['city'],
        null,
        null,
        params['minPrice'],
        params['maxPrice'],
        null,
        null,
        null,
        null,
        null,
        null
      )
    })
  }

  browseItems(
    title: string,
    itemTypes: string,
    city: string,
    bedrooms: number | null,
    bathrooms: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    minSize: number | null,
    maxSize: number | null,
    minArea: number | null,
    maxArea: number | null,
    forsale: boolean | null,
    itemUtilities: string[] | null) {
    this.BrowseService.searchItem(title, itemTypes, city, bedrooms, bathrooms, minPrice, maxPrice, minSize, maxSize, minArea, maxArea, forsale, itemUtilities).subscribe(
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
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
  }

  viewDetails(id: number) {
    this.router.navigate(['item-details/', id])
  }

  changeStatus() {
    if (this.garage === true && this.itemUtilities.indexOf("000000000000000000000001") === -1) {
      this.itemUtilities.push("000000000000000000000001")
    }
    if (this.garage === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000001")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }

    if (this.parking === true && this.itemUtilities.indexOf("000000000000000000000002") === -1) {
      this.itemUtilities.push("000000000000000000000002")
    }
    if (this.parking === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000002")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }
    if (this.pool === true && this.itemUtilities.indexOf("000000000000000000000003") === -1) {
      this.itemUtilities.push("000000000000000000000003")
    }
    if (this.pool === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000003")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }
    if (this.gym === true && this.itemUtilities.indexOf("000000000000000000000004") === -1) {
      this.itemUtilities.push("000000000000000000000004")
    }
    if (this.gym === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000004")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }
    if (this.centralHeating === true && this.itemUtilities.indexOf("000000000000000000000005") === -1) {
      this.itemUtilities.push("000000000000000000000005")
    }
    if (this.centralHeating === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000005")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }
    if (this.internet === true && this.itemUtilities.indexOf("000000000000000000000006") === -1) {
      this.itemUtilities.push("000000000000000000000006")
    }
    if (this.internet === false) {
      const index = this.itemUtilities.indexOf("000000000000000000000006")
      if (index > -1) {
        this.itemUtilities.splice(index, 1)
      }
    }
  }

  toggleVisibility() {
    this.showUtilities = !this.showUtilities
  }

  toggleForSale() {
    this.forsale = !this.forsale
  }

  handleImageError(event: any) {
    event.target.src = "../../assets/image.svg"
  }
}
