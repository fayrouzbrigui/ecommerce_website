import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models'; 
import { MainCategory } from 'src/app/models'; 
import { SubCategory } from 'src/app/models'; 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  MainCategory = 'http://127.0.0.1:8000/products/MainCategory/'
  Category = 'http://127.0.0.1:8000/products/Category/'
  Subcategory = 'http://127.0.0.1:8000/products/Subcategory/'

  API = 'http://127.0.0.1:8000/products/'

  constructor(private http : HttpClient) { }

  // MainCategory services

  listMainCategories(){
    return this.http.get<MainCategory>(this.MainCategory);
  }

  delMainCategory(id:any){
    return this.http.delete<MainCategory>(this.MainCategory+id+'/');
  }

  AddMainCategory(data:any){
    return this.http.post<MainCategory>(this.MainCategory, data);
  }

  getSingleMainCategory(id:any){
    return this.http.get<MainCategory>(this.MainCategory+id+'/')
  }

  editMainCategory(id : number,data:any){
    return this.http.put<MainCategory>(this.MainCategory+id+'/',data);
  }

  // Category services

  listCategories(){
    return this.http.get<Category>(this.Category);
  }

  delCategory(id:any){
    return this.http.delete<Category>(this.Category+id+'/');
  }

  AddCategory(data:any){
    return this.http.post<Category>(this.Category, data);
  }

  getSingleCategory(id:any){
    return this.http.get<MainCategory>(this.Category+id+'/')
  }

  editCategory(id : number,data:any){
    return this.http.put<Category>(this.Category+id+'/',data);
  }

  // Subcategory services

  listSubcategories(){
    return this.http.get<SubCategory>(this.Subcategory);
  }

  delSubcategory(id:any){
    return this.http.delete<SubCategory>(this.Subcategory+id+'/');
  }

  AddSubcategory(data:any){
    return this.http.post<SubCategory>(this.Subcategory, data);
  }

  getSingleSubcategory(id:any){
    return this.http.get<SubCategory>(this.Subcategory+id+'/')
  }

  editSubcategory(id : number,data:any){
    return this.http.put<SubCategory>(this.Subcategory+id+'/',data);
  }

  getCategoryByMainCategoryId(mainCategoryId: number) {
    const url = `${this.API}main_categories/${mainCategoryId}/categories/`;
    return this.http.get(url).toPromise();
  }

  getSubcategoryByCategoryId(CategoryId: number) {
    const url = `${this.API}categories/${CategoryId}/subcategories/`;
    return this.http.get(url).toPromise();
  }
}
