import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupSupplierService {

  private signupUrl = 'http://127.0.0.1:8000/supplier_account/signup/';

  constructor(private http: HttpClient) { }

  signupsupplier(signupData: any): Observable<any> {
    return this.http.post(this.signupUrl, signupData);
  }
}