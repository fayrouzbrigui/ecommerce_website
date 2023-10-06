import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories:any;

  constructor(private categoriesservice: CategoriesService){}

  ngOnInit(): void {

    this.fetchSubCateg();
    
  }

  fetchSubCateg(){
    this.categoriesservice.listSubcategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

}
