import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(private http: HttpClient) { }

  loginAdmin(username: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/admin_account/token/', { username, password });
  }
}
