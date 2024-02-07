import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
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

  searchItem(
    title: string, 
    type: string, 
    city: string, 
    bedrooms: number | null, 
    bathrooms: number | null, 
    garages: number | null, 
    minPrice: number | null, 
    maxPrice: number | null, 
    minSize: number | null, 
    maxSize: number | null, 
    minArea: number | null, 
    maxArea: number | null
    ): Observable<any[]> {
      let params = new HttpParams()
      if (title) params = params.set('title', title);
      if (type) params = params.set('type', type);
      if (city) params = params.set('city', city);
      if (bedrooms != null) params = params.set('bedrooms', bedrooms.toString());
      if (bathrooms != null) params = params.set('bathrooms', bathrooms.toString());
      if (garages != null) params = params.set('garages', garages.toString());
      if (minPrice != null) params = params.set('minPrice', minPrice.toString());
      if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());
      if (minSize != null) params = params.set('minSize', minSize.toString());
      if (maxSize != null) params = params.set('maxSize', maxSize.toString());
      if (minArea != null) params = params.set('minArea', minArea.toString());
      if (maxArea != null) params = params.set('maxArea', maxArea.toString());

      const newUrl = `${this.apiSearchUrl}?${params.toString()}`;
      return this.http.get<any[]>(newUrl);
  }
}