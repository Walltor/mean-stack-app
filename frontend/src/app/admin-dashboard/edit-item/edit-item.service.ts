import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {

  private apiItemUrl = 'http://localhost:3000/items'
  private apiTypeUrl = 'http://localhost:3000/types'
  private apiUtilityUrl = 'http://localhost:3000/utilities'

  constructor(private http: HttpClient) { }

  getItemById(id: ObjectId): Observable<any> {
    const url = `${this.apiItemUrl}/${id}`
    return this.http.get<any[]>(url)
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
}
