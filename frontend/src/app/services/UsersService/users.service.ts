import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private Api_Users = 'http://127.0.0.1:8000/orders/Users/'
  private Api_NB = 'http://127.0.0.1:8000/orders/Nbusers/'
  private apiUrl = 'http://127.0.0.1:8000/orders/users-statistics/';
  URL = 'http://127.0.0.1:8000/products/send-request/'

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.Api_Users);
  }

  delUser(id:any){
    return this.http.delete<User>(this.Api_Users+id+'/');
  }

  getUserCount() : Observable<number>{
    return this.http.get<{ count: number }>(`${this.Api_NB}`).pipe(
      map(response => response.count)
    );
  }

  getNewUsersStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  send(token: string, request: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.URL, request, { headers });
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }

}
