import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainCategory } from 'src/app/models';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.css']
})
export class AddFilterComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  maincategories: any;
  selectedMainCategoryIds: any[] = [];

 

  constructor(private fb: FormBuilder, private filterservice : FilterService, private router:Router, private mainCategoryService : CategoriesService){
    this.angForm = this.fb.group({
      filter_name: '',
      main_category_id: [[]],
    })
  }

  ngOnInit(): void {

    this.mainCategoryService.listMainCategories().subscribe((data) => {
      this.maincategories = data;
    });
  
  }

 
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }


  postdata(){

    const formData = new FormData();
    formData.append('filter_name', this.angForm.get('filter_name')?.value);
    this.selectedMainCategoryIds.forEach(id => {
      formData.append('main_category_id', id.toString());
    });
    
    this.filterservice.addFilter(formData).subscribe(data => {
      this.router.navigate(['filters-list']);
    });

  }

  
}

