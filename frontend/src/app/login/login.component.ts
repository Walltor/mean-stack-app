import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  username: string = ''
  password: string = ''
  loginError: boolean | false = false

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/'])
        },
        error => {
          console.error('Error occured during login.', error)
          this.loginError = true
        }
      )
  }
}
