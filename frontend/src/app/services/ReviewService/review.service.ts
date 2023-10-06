import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  apiUrl = 'http://127.0.0.1:8000/products/reviews/';

  constructor( private http: HttpClient) { }

  addReview(token: string, productId: number, reviewData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const data = { product_id: productId, ...reviewData };
  
    return this.http.post(this.apiUrl, data, { headers });
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }
}
