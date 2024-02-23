import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {
  private apiTypeUrl = 'http://localhost:3000/types';
  private apiPostItemtUrl = 'http://localhost:3000/items'
  private uploadUrl = 'http://localhost:3000/upload'

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl);
  }

  createItem(itemData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.apiPostItemtUrl}/`, itemData, { headers : headers })
    .pipe(
      catchError(error => {
        console.error('Error: ', error);
        return throwError(error);
      })
    );
  }

  uploadImages(formData : any): Observable<any> {
    return this.http.post<any>(this.uploadUrl, formData)
    .pipe(
      catchError(error => {
        console.error('Error: ', error);
        return throwError(error);
      })
    );
  }
}
