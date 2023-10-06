import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-sub-categories-list',
  templateUrl: './sub-categories-list.component.html',
  styleUrls: ['./sub-categories-list.component.css']
})
export class SubCategoriesListComponent implements OnInit{

  showSidebar = true;
  categories: any;

  constructor(private  categoriesservice : CategoriesService){}

  ngOnInit(): void {
    this.fetchSubCateg();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchSubCateg(){
    this.categoriesservice.listSubcategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  deleteCategory(subcategory_id:any){
    this.categoriesservice.delSubcategory(subcategory_id).subscribe(()=>{
      this.fetchSubCateg();})
  }

}

