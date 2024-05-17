import { Component, OnInit } from '@angular/core'
import { ObjectId } from 'mongodb'
import { EditItemService } from './edit-item.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  types: any[] = []
  utilities: any[] = []
  itemId!: ObjectId
  item: any
  itemForm!: FormGroup
  disableStreet = false
  disableBedrooms = false
  disableBathrooms = false
  disableSize = false
  disableArea = false
  noTypes = false

  constructor(
    private editItemService: EditItemService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      types: [[]],
      city: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      bedrooms: [''],
      bathrooms: [''],
      street: ['', [Validators.minLength(5), Validators.maxLength(255)]],
      size: ['', [Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      area: ['', [Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      description: ['', [Validators.minLength(5), Validators.maxLength(255)]],
      forsale: [''],
      featured: [''],
      utilities: [[]]
    })
  }

  ngOnInit(): void {
    this.hasType()
    this.route.params.subscribe(params => {
      this.itemId = params['id']
      this.editItemService.getItemById(this.itemId).subscribe(
        data => {
          this.item = data
          this.itemForm.patchValue({
            title: data.title,
            types: data.types,
            city: data.address.city,
            price: data.price,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            street: data.address.street,
            size: data.size,
            area: data.area,
            description: data.description,
            forsale: data.forsale,
            featured: data.featured,
            utilities: data.utilities
          })
          this.hasType()
        },
        error => {
          console.error('Error fetching item', error)
        }
      )
    })
    this.editItemService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
    this.editItemService.getUtilities().subscribe(
      data => {
        this.utilities = data
      },
      error => {
        console.error('Error fetching utilities', error)
      }
    )
  }

  hasType() {
    const types = this.itemForm.get('types')?.value
    console.log(types)
    const isPlotType = types.some((type: any) => type.name === 'Plot')

    if (isPlotType) {
      this.itemForm.get('area')?.setValidators([Validators.required])
      this.itemForm.get('size')?.clearValidators()
      this.disableStreet = true
      this.itemForm.get('street')?.disable()
      this.disableBedrooms = true
      this.itemForm.get('bedrooms')?.disable()
      this.disableBathrooms = true
      this.itemForm.get('bathrooms')?.disable()
      this.disableSize = true
      this.itemForm.get('size')?.disable()
      this.disableArea = false
      this.itemForm.get('area')?.enable()
    }

    if (isPlotType && types.length > 1) {
      this.itemForm.get('area')?.setValidators([Validators.required])
      this.itemForm.get('size')?.setValidators([Validators.required])
      this.disableStreet = false
      this.itemForm.get('street')?.enable()
      this.disableBedrooms = false
      this.itemForm.get('bedrooms')?.enable()
      this.disableBathrooms = false
      this.itemForm.get('bathrooms')?.enable()
      this.disableSize = false
      this.itemForm.get('size')?.enable()
      this.disableArea = false
      this.itemForm.get('area')?.enable()
    }

    if (!isPlotType) {
      this.itemForm.get('size')?.setValidators([Validators.required])
      this.itemForm.get('area')?.clearValidators()
      this.disableStreet = false
      this.itemForm.get('street')?.enable()
      this.disableBedrooms = false
      this.itemForm.get('bedrooms')?.enable()
      this.disableBathrooms = false
      this.itemForm.get('bathrooms')?.enable()
      this.disableSize = false
      this.itemForm.get('size')?.enable()
      this.disableArea = true
      this.itemForm.get('area')?.disable()
    }

    if (types.length === 0) {
      this.itemForm.get('area')?.clearValidators()
      this.itemForm.get('size')?.clearValidators()
      this.disableStreet = true
      this.itemForm.get('street')?.disable()
      this.disableBedrooms = true
      this.itemForm.get('bedrooms')?.disable()
      this.disableBathrooms = true
      this.itemForm.get('bathrooms')?.disable()
      this.disableSize = true
      this.itemForm.get('size')?.disable()
      this.disableArea = true
      this.itemForm.get('area')?.disable()
    }

    this.itemForm.get('size')?.updateValueAndValidity()
    this.itemForm.get('area')?.updateValueAndValidity()
  }

  checkType(types: any, typeId: ObjectId): boolean {
    return types.some((type: any) => type._id === typeId)
  }

  pushType(item: any, type: any, event: any) {
    const isChecked = event.target.checked
    const index = item.types.findIndex((t: any) => t._id === type._id)
    if (isChecked && index === -1) {
      item.types.push(type)
    } else if (!isChecked && index !== -1) {
      item.types.splice(index, 1)
    }
    this.hasType()
  }

  pushUtility(item: any, utility: any, event: any) {
    const isChecked = event.target.checked
    const index = item.utilities.findIndex((u: any) => u._id === utility._id)
    if (isChecked && index === -1) {
      item.utilities.push(utility)
    } else if (!isChecked && index != -1) {
      item.utilities.splice(index, 1)
    }
  }

  save(item: any) {
    const updatedItem = this.itemForm.value
    const updatedTypes = updatedItem.types.map((type: any) => type._id)
    const updatedUtilities = updatedItem.utilities.map((utility: any) => utility._id)

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
    }

    if (this.itemForm.valid) {
      if (itemToSave.types.length !== 0) {

        this.editItemService.updateItemById(item._id, itemToSave).subscribe(() => {
          console.log(itemToSave)
        })
      }
      this.router.navigate(['/admin/admin-dashboard'])
    } else {
      this.noTypes = true;
    }
  }

  navAdd() {
    this.router.navigate(['admin/add-item'])
  }
}
