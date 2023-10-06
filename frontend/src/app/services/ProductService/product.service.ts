import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = 'http://127.0.0.1:8000/products/Products/'
  Trend_API = 'http://127.0.0.1:8000/products/Trends/'
  Offer_API = 'http://127.0.0.1:8000/products/Offers/'
  url = 'http://127.0.0.1:8000/products/productsBySupplier/'
  baseUrl='http://127.0.0.1:8000/products/add-products/'
  apiUrl = 'http://127.0.0.1:8000/products/main-categories/'

  constructor(private http : HttpClient) { }

  listProducts(){
    return this.http.get<Product>(this.API_URL);
  }

  delProduct(id:any){
    return this.http.delete<Product>(this.API_URL+id+'/');
  }

  AddProduct(token:string, data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, data, { headers });
  }

  getSingleProduct(id:any){
    return this.http.get<Product>(this.API_URL+id+'/');
  }

  editProduct(id: number, data:any){
    return this.http.put<Product>(this.API_URL+id+'/', data);
  }

  listTrends(){
    return this.http.get<Product>(this.Trend_API);
  }

  delTrend(id:any){
    return this.http.delete<Product>(this.Trend_API+id+'/');
  }

  AddTrend(data:any){
    return this.http.post<Product>(this.Trend_API, data);
  }

  getSingleTrend(id:any){
    return this.http.get<Product>(this.Trend_API+id+'/');
  }

  editTrend(id: number, data:any){
    return this.http.put<Product>(this.Trend_API+id+'/', data);
  }

  listOffers(){
    return this.http.get<Product>(this.Offer_API);
  }

  shareOnFacebook(productUrl: string): void {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    window.open(facebookUrl, '_blank');
  }

  getProducts(token: string): Observable<any> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.url, { headers });
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

  getProductsByMainCategory(mainCategoryId: number): Observable<Product[]> {
    const url = `${this.apiUrl}${mainCategoryId}/products/`;
    return this.http.get<Product[]>(url);
  }
}
