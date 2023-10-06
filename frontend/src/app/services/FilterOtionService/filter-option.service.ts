import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterOption } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class FilterOptionService {
  API_URL = 'http://127.0.0.1:8000/products/FilterOptions/'

  constructor(private http: HttpClient) { }

  listFilterOption(){
    return this.http.get<FilterOption>(this.API_URL);
  }

  delFilterOption(id:any){
    return this.http.delete<FilterOption>(this.API_URL+id+'/');
  }

  addFilterOption(data:any){
    return this.http.post<FilterOption>(this.API_URL, data);
  }

  getSingleFilteroption(id:any){
    return this.http.get<FilterOption>(this.API_URL+id+'/');
  }

  editFilterOption(id:number, data:any){
    return this.http.put<FilterOption>(this.API_URL+id+'/', data);
  }
}
