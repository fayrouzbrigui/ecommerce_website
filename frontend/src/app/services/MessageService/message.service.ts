import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  URL = 'http://127.0.0.1:8000/products/send-message/';
  url = 'http://127.0.0.1:8000/products/messages/'

  constructor(private http: HttpClient) { }

  send(token: string, message: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.URL, message, { headers });
  }

  getMessages(token: string): Observable<Message[]> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Message[]>(this.url, { headers });
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }
}
