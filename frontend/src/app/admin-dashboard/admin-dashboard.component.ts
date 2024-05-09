import { Component, OnInit } from '@angular/core'
import { AdminDashboardService } from './admin-dashboard.service'
import { Router } from '@angular/router'
import { ObjectId } from 'mongodb'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

interface Item {
  _id: ObjectId
  title: string
  types: Type[]
  street: Address['street']
  city: Address['city']
  bedrooms: number
  bathrooms: number
  garages: number
  price: number
  size: number
  area: number
  description: string
  forsale: boolean
  featured: boolean
  utilities: Utility[]
}

interface Address {
  street: string,
  city: string
}

interface Type {
  _id: ObjectId
  name: string
}

interface Utility {
  _id: ObjectId
  name: string
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  types: any[] = []
  items: any[] = []
  utilities: any[] = []
  itemForms: FormGroup[] = []
  showDiv: boolean[] = []

  constructor(private AdminDashboardService: AdminDashboardService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.AdminDashboardService.getItems().subscribe(
      data => {
        this.items = data
        this.initItemForms()
        this.fakeChange()
      },
      error => {
        console.error('Error fetching types', error)
      })
    this.AdminDashboardService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      })
    this.AdminDashboardService.getUtilities().subscribe(
      data => {
        this.utilities = data
      },
      error => {
        console.error('Error fetching types', error)
      })
  }

  initItemForms() {
    this.itemForms = this.items.map((item) =>
      this.formBuilder.group({
        title: [item.title, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        types: [item.types],
        city: [item.address.city, Validators.required],
        price: [item.price, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        bedrooms: [item.bedrooms, Validators.required],
        bathrooms: [item.bathrooms, Validators.required],
        street: [item.address.street, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        size: [item.size, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        area: [item.area, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
        description: [item.description, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        forsale: [item.forsale],
        featured: [item.featured],
        utilities: [item.utilities],
      })
    )
  }

  redirect() {
    this.router.navigate(['/add-item'])
  }

  checkType(types: Type[], typeId: ObjectId): boolean {
    return types.some(type => type._id === typeId)
  }

  pushType(item: Item, type: Type, event: any) {
    const isChecked = event.target.checked
    const index = item.types.findIndex(t => t._id === type._id)
    if (isChecked && index === -1) {
      item.types.push(type)
    } else if (!isChecked && index !== -1) {
      item.types.splice(index, 1)
    }
    console.log(item.types)
  }

  logItem(item: Item) {
    console.log
  }

  pushUtility(item: Item, utility: Utility, event: any) {
    const isChecked = event.target.checked
    const index = item.utilities.findIndex(u => u._id === utility._id)
    if (isChecked && index === -1) {
      item.utilities.push(utility)
    } else if (!isChecked && index != -1) {
      item.utilities.splice(index, 1)
    }
    console.log(item.utilities)
  }

  itemDetails(index: number) {
    this.showDiv[index] = !this.showDiv[index]
  }

  fakeChange(): void {
    this.itemForms.forEach((itemForm: FormGroup) => {
      const currentValue = itemForm.value
      itemForm.setValue(currentValue)
    })
  }

  saveChanges(item: Item, index: number) {
    const updatedItem = this.itemForms[index].value
    const updatedTypes = updatedItem.types.map((type: Type) => type._id);
    const updatedUtilities = updatedItem.utilities.map((utility: Utility) => utility._id);

    const itemToSave = {
      title: updatedItem.title,
      types: updatedTypes,
      address: {
        street: updatedItem.street,
        city: updatedItem.city,
        country: 'Countryland'
      },
      price: updatedItem.price,
      bedrooms: updatedItem.bedrooms,
      bathrooms: updatedItem.bathrooms,
      size: updatedItem.size,
      area: updatedItem.area,
      description: updatedItem.description,
      forsale: updatedItem.forsale,
      featured: updatedItem.featured,
      utilities: updatedUtilities
    };

    this.AdminDashboardService.updateItemById(item._id, itemToSave).subscribe(() => {
      console.log(itemToSave)
    })
  }

  delete(item: Item) {
    this.AdminDashboardService.deleteItemById(item._id).subscribe(() => {
      window.location.reload()
    })
  }
}
