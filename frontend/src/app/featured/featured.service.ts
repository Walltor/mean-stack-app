import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FeaturedService {
  private apiTypeUrl = 'http://localhost:3000/types'
  private apiFeaturedUrl = 'http://localhost:3000/featured'

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl)
  }

  getFeatured(): Observable<any[]> {
    return this.http.get<any[]>(this.apiFeaturedUrl)
  }
}
