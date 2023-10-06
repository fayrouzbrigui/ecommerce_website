import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ApiService } from '../ApiService/api.service';
import { Cart, CartItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:8000/products/add-to-cart/';
  private api ='http://127.0.0.1:8000/products/cart/';
  private url = 'http://127.0.0.1:8000/products/cartByUser/';
  private update_quantity_api = 'http://127.0.0.1:8000/products/cart-items/';

  constructor(private http: HttpClient, private apiService: ApiService) {}


  createCart(): Observable<Cart> {
    if (this.apiService.isLoggedIn()) {
      // User is logged in, associate the cart with the user
      return this.http.post<Cart>(this.api, {});
    } else {
      // User is not logged in, associate the cart with the session ID
      return this.http.post<Cart>(this.api, { session_id: this.apiService.getSessionId() });
    }
  }

  addToCart(productId: number, cartId?: number, product?: number): Observable<any> {
    const authToken = this.apiService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  
    if (this.apiService.isLoggedIn()) {
      // User is logged in, add item to their cart
      return this.http.post(this.apiUrl, { product_id: productId }, { headers });
    } else {
      // User is not logged in, add item to the anonymous cart
      return this.http.post(this.apiUrl, { product_id: productId, cart: cartId, product: product }, { headers });
    }
  }


  getUserCart(token: string): Observable<Cart> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Cart>(this.url, { headers });
  }

   getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

  delete(cartItemId: number):Observable<CartItem>{
    return this.http.delete<CartItem>(this.update_quantity_api+cartItemId+'/');
  }


 
  incrementQuantity(cartItemId: number): Observable<Cart>{
    return this.http.post<Cart>(`${this.update_quantity_api}${cartItemId}/increment_quantity/`, {});
  }

  decrementQuantity(cartItemId: number): Observable<Cart>{
    return this.http.post<Cart>(`${this.update_quantity_api}${cartItemId}/decrement_quantity/`, {});
  }

}
