import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupAdminService {

  private signupUrl = 'http://127.0.0.1:8000/admin_account/signup/';

  constructor(private http: HttpClient) { }

  signupadmin(signupData: any): Observable<any> {
    return this.http.post(this.signupUrl, signupData);
  }
}
