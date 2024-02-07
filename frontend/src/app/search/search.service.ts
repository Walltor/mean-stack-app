import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiTypeUrl = 'http://localhost:3000/types';
  private apiItemUrl = 'http://localhost:3000/items';
  private apiSearchUrl = 'http://localhost:3000/items/search';

  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiItemUrl);
  }
}