import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private apiTypeUrl = 'http://localhost:3000/types';
  private apiItemUrl = 'http://localhost:3000/item';

  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiItemUrl);
  }
  
}