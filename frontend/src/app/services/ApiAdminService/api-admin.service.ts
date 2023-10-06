import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthAdminService } from '../AuthAdminService/auth-admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {

  private baseUrl= 'http://127.0.0.1:8000/admin_account/admin-info/';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private auth: AuthAdminService, private http: HttpClient) { 
   const token = localStorage.getItem('fayrouz_auth');
   this._isLoggedIn$.next(!!token);

  }

  

  loginAdmin(username: string, password: string){

   return this.auth.loginAdmin(username, password).pipe(
    tap((response : any ) => {
      console.log('Response:', response);
      const token = response.access;
      console.log('Token:', token);
      this._isLoggedIn$.next(true);
      localStorage.setItem('fayrouz_auth', token);
    })
   );

  }


  getAdminInfo(token: string): Observable<User> {
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

  logoutSupplier() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('fayrouz_auth');
  }


}


