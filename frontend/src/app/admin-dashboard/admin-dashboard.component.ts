import { Component, OnInit } from '@angular/core'
import { AdminDashboardService } from './admin-dashboard.service'
import { Router } from '@angular/router'
import { ObjectId } from 'mongodb'

interface Item {
  _id: ObjectId
  title: string
  type: string
  street: string
  city: string
  bedrooms: number
  bathrooms: number
  garages: number
  price: number
  size: number
  area: number
  forsale: boolean
  featured: boolean
  editing: boolean
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  types: any[] = []
  items: any[] = []

  constructor(private AdminDashboardService : AdminDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.AdminDashboardService.getItems().subscribe(
      data => {
        this.items = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    ) 
    this.AdminDashboardService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    ) 
  }

  redirect() {
    this.router.navigate(['/add-item'])
  }

  toggleEditing(item : Item) {
    item.editing = !item.editing
  }

  saveChanges(item: Item) {
    const itemData = {
      title: item.title,
      type: item.type,
      address: {
        street: item.street,
        city: item.city,
        country: 'Countryland'
      },
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      garages: item.garages,
      price: item.price,
      size: item.size,
      area: item.area,
      forsale: item.forsale,
      featured: item.featured
    }
    this.AdminDashboardService.updateItemById(item._id, item).subscribe(() => {
      item.editing = false
      window.location.reload();
    })
  }

  delete(item: Item) {
    this.AdminDashboardService.deleteItemById(item._id).subscribe(() => {
      window.location.reload();
    })
  }
}
