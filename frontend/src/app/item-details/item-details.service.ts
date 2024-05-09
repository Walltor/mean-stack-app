import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectId } from 'mongodb';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  apiTypeUrl = 'http://localhost:3000/types'
  apiItemUrl = 'http://localhost:3000/items'

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl)
  }

  getItem(id: ObjectId): Observable<any> {
    const url = `${this.apiItemUrl}/${id}`
    return this.http.get<any[]>(url)
  }
}
