import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private apiTypeUrl = 'http://localhost:3000/types'
  private apiUtiltiesUrl = 'http://localhost:3000/utilities'
  private apiSearchUrl = 'http://localhost:3000/items/search'

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiTypeUrl)
  }

  getUtilites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUtiltiesUrl)
  }

  searchItem(
    title: string,
    types: string,
    city: string,
    bedrooms: number | null,
    bathrooms: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    minSize: number | null,
    maxSize: number | null,
    minArea: number | null,
    maxArea: number | null,
    forsale: boolean | null,
    itemUtilities: any[] | null
  ): Observable<any[]> {
    let params = new HttpParams()
    if (title) params = params.set('title', title)
    if (types) params = params.set('types', '["' + types + '"]')
    if (city) params = params.set('city', city)
    if (bedrooms != null) params = params.set('bedrooms', bedrooms.toString())
    if (bathrooms != null) params = params.set('bathrooms', bathrooms.toString())
    if (minPrice != null) params = params.set('minPrice', minPrice.toString())
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString())
    if (minSize != null) params = params.set('minSize', minSize.toString())
    if (maxSize != null) params = params.set('maxSize', maxSize.toString())
    if (minArea != null) params = params.set('minArea', minArea.toString())
    if (maxArea != null) params = params.set('maxArea', maxArea.toString())
    if (forsale != null && forsale != false) params = params.set('forsale', forsale.toString())
    if (itemUtilities != null && itemUtilities.length > 0) params = params.set('utilities', JSON.stringify(itemUtilities))

    const newUrl = `${this.apiSearchUrl}?${params.toString()}`
    return this.http.get<any[]>(newUrl)
  }
}