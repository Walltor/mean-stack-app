import { Component, OnInit } from '@angular/core'
import { AddItemService } from './add-item.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  types: any[] = []
  items: any[] = []
  title: string = ''
  type: string = ''
  street: string = ''
  city: string = ''
  address: any = {}
  bedrooms: number | null = null
  bathrooms: number | null = null
  garages: number | null = null
  price: number | null = null
  size: number | null = null
  area: number | null = null
  forsale: boolean | null = false
  featured: boolean | null = false
  images: any[] = []
  formData = new FormData

  constructor(private AddItemService : AddItemService, private router : Router) {}

  onFileChange(event: any) {
    const files: FileList = event.target.files
    for (let i = 0; i < files.length; i++) {
      this.images.push(Date.now() + '-' + files[i].name)
      this.formData.append('images', files[i])

      console.log(this.formData)
    }
  }

  ngOnInit(): void {
    this.AddItemService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    ) 
  }

  createItem(): void {
    this.address.append
    const itemData = { 
      title: this.title,
      type: this.type,
      address: {
        street: this.street,
        city: this.city,
        country: 'Countryland'
      },
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      garages: this.garages,
      price: this.price,
      size: this.size,
      area: this.area,
      forsale: this.forsale,
      featured: this.featured,
      images: this.images
    }
    
    this.AddItemService.createItem(itemData).subscribe(
      (response) => {
        console.log('Item created successfully:', response)
      },
      (error) => {
        console.error('Error creating item:', error)
      }
    )
  }

  uploadImages() : void {
    this.AddItemService.uploadImages(this.formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response)
      },
      (error) => {
        console.error('Error uploading files:', error)
      }
    )
  }

  backToDashboard() {
    this.router.navigate(['/admin'])
  }
}

