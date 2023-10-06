import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { Observable } from 'rxjs';
import { Wishlist, WishlistItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class WishlistService{

  private apiUrl = 'http://127.0.0.1:8000/products/add-to-wishlist/';
  private api ='http://127.0.0.1:8000/products/wishlist/';
  private url = 'http://127.0.0.1:8000/products/wishlistByUser/';
  private remove_api = 'http://127.0.0.1:8000/products/remove-wishlist-item/';
  private update_quantity_api = 'http://127.0.0.1:8000/products/wishlist-items/';

  constructor(private http: HttpClient, private apiService: ApiService) {}


  createWishlist(): Observable<Wishlist> {
    if (this.apiService.isLoggedIn()) {
      // User is logged in, associate the cart with the user
      return this.http.post<Wishlist>(this.api, {});
    } else {
      // User is not logged in, associate the cart with the session ID
      return this.http.post<Wishlist>(this.api, { session_id: this.apiService.getSessionId() });
    }
  }

  addToWishlist(productId: number, wishlistId?: number, product?: number): Observable<any> {
    const authToken = this.apiService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  
    if (this.apiService.isLoggedIn()) {
      // User is logged in, add item to their cart
      return this.http.post(this.apiUrl, { product_id: productId }, { headers });
    } else {
      // User is not logged in, add item to the anonymous cart
      return this.http.post(this.apiUrl, { product_id: productId, wishlist: wishlistId, product: product }, { headers });
    }
  }


  getUserWishlist(token: string): Observable<Wishlist> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Wishlist>(this.url, { headers });
  }

   getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

  delete(wishlistItemId: number):Observable<any>{
    const url = `${this.update_quantity_api}${wishlistItemId}/`;
    return this.http.delete(url);
  }

}
