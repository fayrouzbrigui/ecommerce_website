import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-edit-sub-categories',
  templateUrl: './edit-sub-categories.component.html',
  styleUrls: ['./edit-sub-categories.component.css']
})
export class EditSubCategoriesComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  categories: any;
  id: any;

  constructor(private fb: FormBuilder, private categoriesservice : CategoriesService, private router:Router, private activatedRoute: ActivatedRoute){
    this.angForm = this.fb.group({
      subcategory_name: new FormControl('', Validators.required),
      subcategory_image: '',
      subcategory_icon:'',
      category_id:'',
    })
  }

  ngOnInit(): void {
    this.fetchCategories();

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.categoriesservice.getSingleSubcategory(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
      })
    })
  
  }

  fetchCategories(){
    this.categoriesservice.listCategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('subcategory_image')?.setValue(file);
    }
  }

  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('subcategory_icon')?.setValue(file);
    }
  }


  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    
  }


  selectCategory(event:any){
    const CategoryId = event.target.value;
    const selectedCategory = this.categories.find((category: any) => category.category_id === parseInt(CategoryId));
    if (selectedCategory) {
      console.log(`Selected Category: ${selectedCategory.category_name}`);
    }
    this.angForm.get('category_id')?.setValue(parseInt(CategoryId));
  }


  postdata(){

    const formData = new FormData();
    formData.append('subcategory_name', this.angForm.get('subcategory_name')?.value);
    formData.append('subcategory_image', this.angForm.get('subcategory_image')?.value);
    formData.append('subcategory_icon', this.angForm.get('subcategory_icon')?.value);
    formData.append('category_id', this.angForm.get('category_id')?.value || '');
    formData.append('id', this.id);

    this.categoriesservice.editSubcategory(this.id, formData).subscribe(data => {
      this.router.navigate(['sub-categories']);
    });
  }

}


