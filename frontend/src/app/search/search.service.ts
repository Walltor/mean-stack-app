import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiTypeUrl = 'http://localhost:3000/types';

  constructor(private http: HttpClient) { }
  
  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl);
  }
}