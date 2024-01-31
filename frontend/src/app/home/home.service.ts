import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private router: Router) { }
  
  navigateToBrowsePage() {
    this.router.navigate(['/browse']);
  }
}
