import { Component, OnInit } from '@angular/core'
import { AdminDashboardService } from './admin-dashboard.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  types: any[] = []
  items: any[] = []
  utilities: any[] = []

  constructor(
    private AdminDashboardService: AdminDashboardService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.AdminDashboardService.getItems().subscribe(
      data => {
        this.items = data
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

  navAdd() {
    this.router.navigate(['/admin/add-item'])
  }

  navEdit(id: string) {
    this.router.navigate(['/admin/edit-item/', id])
  }

  navShow(id: string) {
    this.router.navigate(['/item-details/', id])
  }

  delete(item: any) {
    this.AdminDashboardService.deleteItemById(item._id).subscribe(() => {
      window.location.reload()
    })
  }

  handleImageError(event: any) {
    event.target.src = "../../assets/image.svg"
  }
}
