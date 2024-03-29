import { Component, OnInit } from '@angular/core'
import { AdminDashboardService } from './admin-dashboard.service'
import { Router } from '@angular/router'
import { ObjectId } from 'mongodb'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
  itemForms: FormGroup[] = []

  constructor(private AdminDashboardService : AdminDashboardService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.AdminDashboardService.getItems().subscribe(
      data => {
        this.items = data
        this.initItemForms()
        this.fakeChange()
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

  initItemForms() {
    this.itemForms = this.items.map((item) =>
      this.fb.group({
        title: [item.title, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        city: [item.address.city, Validators.required], 
        type: [item.type._id, Validators.required],
        price: [item.price, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        bedrooms: [item.bedrooms, Validators.required],
        bathrooms: [item.bathrooms, Validators.required],
        garages: [item.garages, Validators.required],
        street: [item.address.street, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        size: [item.size, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        area: [item.area, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        forsale:[item.forsale],
        featured:[item.featured]
      })
    )
    this.itemForms.forEach((itemForm : FormGroup) => {
      itemForm.get('type')?.valueChanges.subscribe(value => {
        if(value === '65afd0827c1611711ff207b5') {
          itemForm.get('bedrooms')?.clearValidators()
          itemForm.get('bathrooms')?.clearValidators()
          itemForm.get('garages')?.clearValidators()
          itemForm.get('street')?.clearValidators()
          itemForm.get('size')?.clearValidators()
          itemForm.get('area')?.setValidators(Validators.required)
        } else {
          itemForm.get('bedrooms')?.setValidators(Validators.required)
          itemForm.get('bathrooms')?.setValidators(Validators.required)
          itemForm.get('garages')?.setValidators(Validators.required)
          itemForm.get('street')?.setValidators(Validators.required)
          itemForm.get('size')?.setValidators(Validators.required)
          itemForm.get('area')?.clearValidators()
        }
        itemForm.get('bedrooms')?.updateValueAndValidity()
        itemForm.get('bathrooms')?.updateValueAndValidity()
        itemForm.get('garages')?.updateValueAndValidity()
        itemForm.get('street')?.updateValueAndValidity()
        itemForm.get('size')?.updateValueAndValidity()
        itemForm.get('area')?.updateValueAndValidity()
      })
    })
  }

  fakeChange(): void {
    this.itemForms.forEach((itemForm : FormGroup) => {
    const currentValue = itemForm.value
    itemForm.setValue(currentValue)
    })    
  }

  saveChanges(item: Item, index: number) {
    const updatedItem = this.itemForms[index].value
    this.AdminDashboardService.updateItemById(item._id, updatedItem).subscribe(() => {
      item.editing = false
      window.location.reload()
    })
  }

  delete(item: Item) {
    this.AdminDashboardService.deleteItemById(item._id).subscribe(() => {
      window.location.reload()  
    })
  }
}
