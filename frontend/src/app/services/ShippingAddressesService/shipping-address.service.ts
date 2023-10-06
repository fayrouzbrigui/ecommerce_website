import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddress } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {

  baseUrl = 'http://127.0.0.1:8000/orders/shipping-addresses/';
  url = 'http://127.0.0.1:8000/orders/addressByUser/';
  default_url = 'http://127.0.0.1:8000/orders/defaultaddressByUser/';


  constructor(private http: HttpClient) { }

  addShippingAddress(token: string, newaddress: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, newaddress, { headers });
  }

  getShippingAddres(token: string): Observable<ShippingAddress[]> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ShippingAddress[]>(this.url, { headers });
  }

  getDefaultShippingAddres(token: string): Observable<ShippingAddress> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ShippingAddress>(this.default_url, { headers });
  }

  setShippingAddressAsDefault(token: string, addressId: number): Observable<any> {
    const url = `${this.baseUrl}${addressId}/set_default/`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, null, { headers });
  }


  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }
}
