import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slider } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  API_URL = 'http://127.0.0.1:8000/products/Sliders/'

  constructor(private http : HttpClient) { }

  listSliders(){
    return this.http.get<Slider>(this.API_URL);
  }

  delSlider(id:any){
    return this.http.delete<Slider>(this.API_URL+id+'/');
  }

  AddSlider(data:any){
    return this.http.post<Slider>(this.API_URL, data);
  }

  getSingleSlider(id:any){
    return this.http.get<Slider>(this.API_URL+id+'/');
  }

  ediSlider(id: number, data:any){
    return this.http.put<Slider>(this.API_URL+id+'/', data);
  }

}
