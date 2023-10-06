import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-main-categories-list',
  templateUrl: './main-categories-list.component.html',
  styleUrls: ['./main-categories-list.component.css']
})
export class MainCategoriesListComponent implements OnInit{

  showSidebar = true;
  mcategories: any;
  categories:any;
  scategories:any;

  constructor(private  categoriesservice : CategoriesService){}

  ngOnInit(): void {
    this.fetchMaiCateg();
   
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchMaiCateg(){
    this.categoriesservice.listMainCategories().subscribe((data) =>{
      this.mcategories = data;
      console.log(this.mcategories);
    })
  }


  deleteMCategory(main_category_id:any){
    this.categoriesservice.delMainCategory(main_category_id).subscribe(()=>{
      this.fetchMaiCateg();})
  }


}
