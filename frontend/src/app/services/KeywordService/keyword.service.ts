import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Keyword } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  API_URL = 'http://127.0.0.1:8000/products/Keywords/'

  constructor(private http: HttpClient) { }

  listKeywords(){
    return this.http.get<Keyword>(this.API_URL);
  }

  delKeyword(id:any){
    return this.http.delete<Keyword>(this.API_URL+id+'/');
  }

  addKeyword(data:any){
    return this.http.post<Keyword>(this.API_URL, data);
  }

  getSingleKeyword(id:any){
    return this.http.get<Keyword>(this.API_URL+id+'/');
  }

  editKeyword(id : number,data:any){
    return this.http.put<Keyword>(this.API_URL+id+'/',data);
  }

}
