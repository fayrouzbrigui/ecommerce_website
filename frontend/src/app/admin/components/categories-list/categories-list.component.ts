import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit{

  showSidebar = true;
  categories: any;

  constructor(private  categoriesservice : CategoriesService){}

  ngOnInit(): void {
    this.fetchCateg();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchCateg(){
    this.categoriesservice.listCategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  deleteCategory(category_id:any){
    this.categoriesservice.delCategory(category_id).subscribe(()=>{
      this.fetchCateg();})
  }

}
