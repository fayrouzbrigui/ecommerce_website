import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl='http://127.0.0.1:8000/products/requests/'
  url = 'http://127.0.0.1:8000/products/response/'
  constructor(private http : HttpClient) { }

  listRequests(){
    return this.http.get<Request>(this.baseUrl);
  }

  updateRequestStatus(requestId: number, status: string) {
    const url = `${this.baseUrl}${requestId}/`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { status: status };
    return this.http.put<Request>(url, body, { headers });
  }

  getResponse(token: string): Observable<Request[]> {
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Request[]>(this.url, { headers });
  }

  getToken(): string {
    return localStorage.getItem('fayrouz_auth') || '';
  }
  

}
