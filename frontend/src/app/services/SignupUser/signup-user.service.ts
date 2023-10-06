import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupUserService {

  private signupUrl = 'http://127.0.0.1:8000/accounts/signup/';

  constructor(private http: HttpClient) { }

  signupuser(signupData: any): Observable<any> {
    return this.http.post(this.signupUrl, signupData);
  }
}
