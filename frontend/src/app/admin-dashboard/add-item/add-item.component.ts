import { Component, OnInit } from '@angular/core'
import { AddItemService } from './add-item.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
  myForm !: FormGroup
  fileError: string | null = null
  previewImages: string[] = []
  storage = 'http://localhost:3000/uploads/'

  constructor(private addItemService : AddItemService, private router : Router, private formBuilder: FormBuilder) {}

  onFileChange(event: any) {
    const files: FileList = event.target.files
    if (files && files.length > 0) {
      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/png']
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if(file && file.size > maxSize) {
          this.fileError = 'File size exceeds 5MB limit.'
          return
        }
        if(file && !allowedTypes.includes(file.type)) {
          this.fileError = 'Invalid file type.'
          return
        }
        this.images.push('http://localhost:3000/uploads/' + files[i].name)
        this.formData.append('images', files[i])
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
              this.previewImages.push(reader.result as string)
          };
          reader.readAsDataURL(files[i])
        }
      }
      this.fileError = null
    }
  }

  ngOnInit(): void {
    this.addItemService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error)
      }) 
    this.myForm = this.formBuilder.group({ 
      title: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      city: [{ value: '', disabled: false }, Validators.required], 
      type: [{ value: '', disabled: false }, Validators.required],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      bedrooms: [{ value: '', disabled: false }, Validators.required],
      bathrooms: [{ value: '', disabled: false }, Validators.required],
      garages: [{ value: '', disabled: false }, Validators.required],
      street: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      size: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      area: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('0|[0-9]+'), Validators.max(999999999)]],
      featured: [{ value: false, disabled: false}],
      forsale: [{ value: false, disabled: false}]
    })
    this.myForm.get('type')?.valueChanges.subscribe(value => {
      if(value === '65afd0827c1611711ff207b5') {
        this.myForm.get('bedrooms')?.clearValidators()
        this.myForm.get('bathrooms')?.clearValidators()
        this.myForm.get('garages')?.clearValidators()
        this.myForm.get('street')?.clearValidators()
        this.myForm.get('size')?.clearValidators()
        this.myForm.get('area')?.setValidators(Validators.required)
        this.removeConditionalFieldsPlot()
      } else {
        this.myForm.get('bedrooms')?.setValidators(Validators.required)
        this.myForm.get('bathrooms')?.setValidators(Validators.required)
        this.myForm.get('garages')?.setValidators(Validators.required)
        this.myForm.get('street')?.setValidators(Validators.required)
        this.myForm.get('size')?.setValidators(Validators.required)
        this.myForm.get('area')?.clearValidators()
        this.removeConditionalFieldsElse()
      }
      this.myForm.get('bedrooms')?.updateValueAndValidity()
      this.myForm.get('bathrooms')?.updateValueAndValidity()
      this.myForm.get('garages')?.updateValueAndValidity()
      this.myForm.get('street')?.updateValueAndValidity()
      this.myForm.get('size')?.updateValueAndValidity()
      this.myForm.get('area')?.updateValueAndValidity()
    })
  }

  removeConditionalFieldsPlot() {
    this.myForm.get('bedrooms')?.setValue('')
    this.myForm.get('bathrooms')?.setValue('')
    this.myForm.get('garages')?.setValue('')
    this.myForm.get('street')?.setValue('')
    this.myForm.get('size')?.setValue('')
  }

  removeConditionalFieldsElse() {
    this.myForm.get('area')?.setValue('')
  }

  createItem(): void {
    this.address.append
    const itemData = { 
      title: this.myForm.get('title')?.value,
      type: this.myForm.get('type')?.value,
      address: {
        street: this.myForm.get('street')?.value,
        city: this.myForm.get('city')?.value,
        country: 'Countryland'
      },
      bedrooms: this.myForm.get('bedrooms')?.value,
      bathrooms: this.myForm.get('bathrooms')?.value,
      garages: this.myForm.get('garages')?.value,
      price: this.myForm.get('price')?.value,
      size: this.myForm.get('size')?.value,
      area: this.myForm.get('area')?.value,
      forsale: this.myForm.get('forsale')?.value,
      featured: this.myForm.get('featured')?.value,
      images: this.images
    }
    
    this.addItemService.createItem(itemData).subscribe(
      (response) => {
        console.log('Item created successfully:', response)
      },
      (error) => {
        console.error('Error creating item:', error)
      })
  }

  uploadImages() : void {
    this.addItemService.uploadImages(this.formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response)
      },
      (error) => {
        console.error('Error uploading files:', error)
      })
  }

  backToDashboard() {
    this.router.navigate(['/admin'])
  }
}

