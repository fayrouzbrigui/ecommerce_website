import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';

@Component({
  selector: 'app-edit-filters',
  templateUrl: './edit-filters.component.html',
  styleUrls: ['./edit-filters.component.css']
})
export class EditFiltersComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  maincategories: any;
  selectedMainCategoryIds: any[] = [];
  id:any;
 

  constructor(private fb: FormBuilder, private filterservice : FilterService, private activatedRoute: ActivatedRoute, private router:Router, private mainCategoryService : CategoriesService){
    this.angForm = this.fb.group({
      filter_name: '',
      main_categories: [[]],
    })
  }

  ngOnInit(): void {

    this.mainCategoryService.listMainCategories().subscribe((data) => {
      this.maincategories = data;
    });

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.filterservice.getSingleFilter(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
        this.selectedMainCategoryIds = data.main_category_id.map((mainCategory: any) => mainCategory.main_category_id);
      })
    })
  
  }

 
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }


  postdata(){

    const formData = new FormData();
    formData.append('filter_name', this.angForm.get('filter_name')?.value);
    formData.append('id', this.id);

  console.log('Selected Main Categories:', this.selectedMainCategoryIds);
  this.selectedMainCategoryIds.forEach(id => {
    formData.append("main_categories[]", id.toString());
  });

  console.log('Form Data:', formData);
    
    this.filterservice.editFilter(this.id, formData).subscribe(data => {
      this.router.navigate(['filters-list']);
    });

  }
}

