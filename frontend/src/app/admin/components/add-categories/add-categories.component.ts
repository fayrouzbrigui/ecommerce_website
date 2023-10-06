import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent  implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  categories: any;

  constructor(private fb: FormBuilder,  private main : CategoriesService, private router:Router){
    this.angForm = this.fb.group({
      category_name: new FormControl('', Validators.required),
      category_image: '',
      category_icon: '',
      main_category_id:'',
    })
  }

  ngOnInit(): void {
    this.fetchMainCateg();
  
  }

  fetchMainCateg(){
    this.main.listMainCategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('category_image')?.setValue(file);
    }
  }

  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('category_icon')?.setValue(file);
    }
  }



  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    
  }


  selectMainCategory(event:any){
    const MainCategoryId = event.target.value;
    const selectMainCategory = this.categories.find((category: any) => category.main_category_id === parseInt(MainCategoryId));
    if (selectMainCategory) {
      console.log(`Selected main category: ${selectMainCategory.main_category_name}`);
    }
    this.angForm.get('main_category_id')?.setValue(parseInt(MainCategoryId));
  }


  postdata(){

    const formData = new FormData();
    formData.append('category_name', this.angForm.get('category_name')?.value);
    formData.append('category_image', this.angForm.get('category_image')?.value);
    formData.append('category_icon', this.angForm.get('category_icon')?.value);
    formData.append('main_category_id', this.angForm.get('main_category_id')?.value || '');
    this.main.AddCategory(formData).subscribe(data => {
      this.router.navigate(['categories']);
    });
  }

}

