import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { Brand } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  API_URL = 'http://127.0.0.1:8000/products/Brands/'

  constructor(private http: HttpClient) { }

  listBrands(){
    return this.http.get<Brand>(this.API_URL);
  }

  delBrand(id:any){
    return this.http.delete<Brand>(this.API_URL+id+'/');
  }

  AddBrand(data:any){
    return this.http.post<Brand>(this.API_URL, data);
  }

  getSingleBrand(id:any){
    return this.http.get<Brand>(this.API_URL+id+'/')
  }

  editBrand(id : number,data:any){
    return this.http.put<Brand>(this.API_URL+id+'/',data);
  }
}
