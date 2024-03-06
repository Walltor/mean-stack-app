import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService) { }

  token = localStorage.getItem('token')
  isLoggedIn!: boolean

  ngOnInit(): void {
    this.authService.authEvent.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn
    })
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
