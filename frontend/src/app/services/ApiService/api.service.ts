import { Injectable } from '@angular/core';
import { AuthService } from '../AuthService/auth.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl= 'http://127.0.0.1:8000/accounts/user-info/';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private auth: AuthService, private http: HttpClient) { 
   const token = localStorage.getItem('fayrouz_auth');
   this._isLoggedIn$.next(!!token);

  }

  

  loginUser(username: string, password: string){

   return this.auth.loginUser(username, password).pipe(
    tap((response : any ) => {
      console.log('Response:', response);
      const token = response.access;
      console.log('Token:', token);
      this._isLoggedIn$.next(true);
      localStorage.setItem('fayrouz_auth', token);
    })
   );

  }


  getUserInfo(token: string): Observable<User> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(this.baseUrl, { headers });
  }

   getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('fayrouz_auth');
    return !!token;
  }
  
  getSessionId(): string | null{
    return localStorage.getItem('fayrouz_session_id');
  }

  logoutUser() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('fayrouz_auth');
  }


}
