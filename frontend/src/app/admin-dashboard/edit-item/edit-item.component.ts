import { Component, OnInit } from '@angular/core'
import { ObjectId } from 'mongodb'
import { EditItemService } from './edit-item.service'
import { ActivatedRoute } from '@angular/router'
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

  constructor(
    private editItemService: EditItemService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      types: [''],
      city: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      street: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      size: ['', [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      area: ['', [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      forsale: [''],
      featured: [''],
      utilities: ['']
    })
  }

  ngOnInit(): void {
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
          console.log(this.item)
          console.log(this.itemForm.value)
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

    this.editItemService.updateItemById(item._id, itemToSave).subscribe(() => {
      console.log(itemToSave)
    })
  }
}
