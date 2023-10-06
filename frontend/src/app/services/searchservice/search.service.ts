import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(query: string) {
    const params = { q: query };
    return this.http.get('http://127.0.0.1:8000/products/search/', { params });
  }
}
