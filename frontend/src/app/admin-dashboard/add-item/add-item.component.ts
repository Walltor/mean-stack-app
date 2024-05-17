import { Component, OnInit } from '@angular/core'
import { AddItemService } from './add-item.service'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})

export class AddItemComponent implements OnInit {
  types: any[] = []
  utilities: any[] = []
  itemForm !: FormGroup
  images: any[] = []
  formData = new FormData
  fileError: string | null = null
  previewImages: string[] = []
  storage = 'http://localhost:3000/uploads/'
  disableStreet = false
  disableBedrooms = false
  disableBathrooms = false
  disableSize = false
  disableArea = false
  noTypes = false

  constructor(
    private addItemService: AddItemService,
    private router: Router,
    private formBuilder: FormBuilder
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
      forsale: [false],
      featured: [false],
      utilities: [[]]
    })
  }

  ngOnInit(): void {
    this.hasType()
    this.addItemService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }
    )
    this.addItemService.getUtilities().subscribe(
      data => {
        this.utilities = data
      },
      error => {
        console.error('Error fetching utilities', error)
      }
    )
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files
    if (files && files.length > 0) {
      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/png']
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file && file.size > maxSize) {
          this.fileError = "File size of '" + file.name + "' exceeds 5MB limit."
          return
        }
        if (file && !allowedTypes.includes(file.type)) {
          this.fileError = 'Invalid file type.'
          return
        }
        this.images.push('http://localhost:3000/uploads/' + files[i].name)
        this.formData.append('images', files[i])
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            this.previewImages.push(reader.result as string)
          }
          reader.readAsDataURL(files[i])
        }
      }
      this.fileError = null
    }
  }

  hasType() {
    const types = this.itemForm.get('types')?.value
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

  pushType(type: any, event: any) {
    const types = this.itemForm.get('types')?.value
    const isChecked = event.target.checked
    const index = types.findIndex((t: any) => t._id === type._id)
    if (isChecked && index === -1) {
      types.push(type)
    } else if (!isChecked && index !== -1) {
      types.splice(index, 1)
    }
    this.hasType()
  }

  pushUtility(utility: any, event: any) {
    const utilities = this.itemForm.get('utilities')?.value
    const isChecked = event.target.checked
    const index = utilities.findIndex((u: any) => u._id === utility._id)
    if (isChecked && index === -1) {
      utilities.push(utility)
    } else if (!isChecked && index != -1) {
      utilities.splice(index, 1)
    }
  }

  save() {
    const item = this.itemForm.value
    const updatedTypes = item.types.map((type: any) => type._id)
    const updatedUtilities = item.utilities.map((utility: any) => utility._id)

    const itemToSave = {
      title: item.title,
      types: updatedTypes,
      address: {
        street: item.street,
        city: item.city,
        country: 'Countryland'
      },
      price: item.price,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      size: item.size,
      area: item.area,
      description: item.description,
      forsale: item.forsale,
      featured: item.featured,
      utilities: updatedUtilities,
      images: this.images
    }

    if (itemToSave.types.length !== 0) {
      if (this.itemForm.valid) {
        this.addItemService.createItem(itemToSave).subscribe(
          (response) => {
            console.log(itemToSave)
            console.log('Item created successfully:', response)
          },
          (error) => {
            console.error('Error creating item:', error)
          })

        this.addItemService.uploadImages(this.formData).subscribe(
          (response) => {
            console.log('Files uploaded successfully:', response)
          },
          (error) => {
            console.error('Error uploading files:', error)
          })

        this.router.navigate(['admin/admin-dashboard'])
      }
    } else {
      this.noTypes = true
    }
  }
}

