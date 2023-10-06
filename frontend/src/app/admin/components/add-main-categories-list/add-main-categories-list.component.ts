import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-add-main-categories-list',
  templateUrl: './add-main-categories-list.component.html',
  styleUrls: ['./add-main-categories-list.component.css']
})
export class AddMainCategoriesListComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  brands: any;

  constructor(private fb: FormBuilder, private brandservice : BrandService, private main : CategoriesService, private router:Router){
    this.angForm = this.fb.group({
      main_category_name: new FormControl('', Validators.required),
      main_category_image: '',
      main_category_icon: '',
    })
  }

  ngOnInit(): void {
  
  }


  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('main_category_image')?.setValue(file);
    }
  }

  onIconSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('main_category_icon')?.setValue(file);
    }
  }


  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    
  }

  postdata(){

    const formData = new FormData();
    formData.append('main_category_name', this.angForm.get('main_category_name')?.value);
    formData.append('main_category_image', this.angForm.get('main_category_image')?.value);
    formData.append('main_category_icon', this.angForm.get('main_category_icon')?.value);
    this.main.AddMainCategory(formData).subscribe(data => {
      this.router.navigate(['main-categories']);
    });
  }

}
