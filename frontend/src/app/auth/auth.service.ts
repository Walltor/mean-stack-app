import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  private authUrl = 'http://localhost:3000/login' 
  authEvent = new EventEmitter<boolean>()
  isLogged!: boolean

  constructor(private http : HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }) 
    }
    return next.handle(req)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password })
    .pipe(
      map(response => {
        localStorage.setItem('token', response.token)
        this.authEvent.emit(true)
        this.isLogged = true
        return response
      }),
      catchError(error => {
        throw error
      })
    )
  }

  logout() {
    localStorage.removeItem('token')
    this.authEvent.emit(false)
    this.isLogged = false
  }

  isLoggedIn() {
    if(localStorage.getItem('token')) {
      return true
    }
    return false
  }
}
