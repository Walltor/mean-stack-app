import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { ObjectId } from 'mongodb'

@Injectable({
  providedIn: 'root'
})

export class AdminDashboardService {
  private apiItemUrl = 'http://localhost:3000/items'
  private apiTypeUrl = 'http://localhost:3000/types'
  private apiUtilityUrl = 'http://localhost:3000/utilities'

  constructor(private http: HttpClient, private Router: Router) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiItemUrl)
  }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl)
  }

  getUtilities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUtilityUrl)
  }

  updateItemById(id: ObjectId, itemData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.put(`${this.apiItemUrl}/${id}`, itemData, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error: ', error)
          return throwError(error)
        })
      )
  }

  deleteItemById(id: ObjectId): Observable<any> {
    return this.http.delete(`${this.apiItemUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error: ', error)
          return throwError(error)
        })
      )
  }
}
