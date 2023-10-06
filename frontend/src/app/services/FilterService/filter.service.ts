import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  API_URL = 'http://127.0.0.1:8000/products/Filters/'
  constructor(private http: HttpClient) { }

  listFilters(){
    return this.http.get<Filter>(this.API_URL);
  }

  delFilter(id:any){
    return this.http.delete<Filter>(this.API_URL+id+'/');
  }

  addFilter(data:any){
    return this.http.post<Filter>(this.API_URL, data);
  }

  getSingleFilter(id:any){
    return this.http.get<Filter>(this.API_URL+id+'/');
  }

  editFilter(id:number, data:any){
    return this.http.put<Filter>(this.API_URL+id+'/', data);
  }
}
