import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';

@Component({
  selector: 'app-edit-main-categories',
  templateUrl: './edit-main-categories.component.html',
  styleUrls: ['./edit-main-categories.component.css']
})
export class EditMainCategoriesComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  brands: any;
  id:any;

  constructor(private fb: FormBuilder, private brandservice : BrandService, private categoriesservice : CategoriesService, private router:Router, private activatedRoute: ActivatedRoute){
    this.angForm = this.fb.group({
      main_category_name: new FormControl('', Validators.required),
      main_category_image: '',
      main_category_icon:''
    })
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.categoriesservice.getSingleMainCategory(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
      })
    })
  
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
    formData.append('id', this.id);
    
    this.categoriesservice.editMainCategory(this.id, formData).subscribe(data => {
      this.router.navigate(['main-categories']);
    });
  }

}
