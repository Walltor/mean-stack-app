import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiItemUrl = 'http://localhost:3000/items';
  private apiTypeUrl = 'http://localhost:3000/types';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiItemUrl);
  }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl);
  }
}
