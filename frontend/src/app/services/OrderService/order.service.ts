import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order, OrderItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://127.0.0.1:8000/orders/user-order/pass_order/';
  API = 'http://127.0.0.1:8000/orders/OrderItemByUser/';
  Url = 'http://127.0.0.1:8000/orders/SingleOrderItemByUser/';
  Api_NB = 'http://127.0.0.1:8000/orders/Nborders/';
  api = 'http://127.0.0.1:8000/orders/earning/';
  url = 'http://127.0.0.1:8000/orders/order-item-product/';
  base = 'http://127.0.0.1:8000/orders/orderitem/'
  
  constructor(private http: HttpClient) { }

  passOrder(token: string, orderData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, orderData, { headers });
  }

  getOrder(token: string): Observable<OrderItem[]> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<OrderItem[]>(this.API, { headers });
  }

  getOrderItem(token: string): Observable<OrderItem[]> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<OrderItem[]>(this.url, { headers });
  }

  getSingleOrderItem(token: string, orderItemId: number): Observable<OrderItem> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = {headers: headers};
    const url = `http://127.0.0.1:8000/orders/SingleOrderItemByUser/${orderItemId}/`;
    return this.http.get<OrderItem>(url, options);
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

  getOrdersCount() : Observable<number>{
    return this.http.get<{ count: number }>(`${this.Api_NB}`).pipe(
      map(response => response.count)
    );
  }

  getearning() : Observable<number>{
    return this.http.get<{ earnings: number }>(`${this.api}`).pipe(
      map(response => response.earnings)
    );
  }

  updateOrderStatus(orderItemId: number, newStatus: string) {
    const url = `${this.base}${orderItemId}/update-status/`;
    const payload = { status: newStatus };
    return this.http.put(url, payload);
  }
  
}
