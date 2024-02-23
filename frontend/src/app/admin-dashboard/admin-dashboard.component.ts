import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './admin-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  types: any[] = [];
  items: any[] = [];
  title: string = '';
  type: string = '';
  city: string = '';
  bedrooms: number | null = null;
  bathrooms: number | null = null;
  garages: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minSize: number | null = null;
  maxSize: number | null = null;
  minArea: number | null = null;
  maxArea: number | null = null;    

  constructor(private AdminDashboardService : AdminDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.AdminDashboardService.getItems().subscribe(
      data => {
        this.items = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    ) 
    this.AdminDashboardService.getTypes().subscribe(
      data => {
        this.types = data
      },
      error => {
        console.error('Error fetching types', error);
      }
    ) 
  }

  redirect() {
    this.router.navigate(['/add-item'])
  }
}
