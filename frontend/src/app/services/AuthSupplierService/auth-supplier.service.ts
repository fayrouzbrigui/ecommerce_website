import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthSupplierService {

  constructor(private http: HttpClient) { }

  loginSupplier(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/supplier_account/token/', { username, password });
  }
}

