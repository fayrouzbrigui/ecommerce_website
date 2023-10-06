import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/BrandService/brand.service';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  id:any;

  constructor(private fb: FormBuilder, private brandservice : BrandService, private router:Router, private activatedRoute: ActivatedRoute){
    this.angForm = this.fb.group({
      brand_name: '',
      brand_image: '',
    })
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.brandservice.getSingleBrand(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
      })
    })
  
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('brand_image')?.setValue(file);
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }


  postdata(){

    const formData = new FormData();
    formData.append('brand_name', this.angForm.get('brand_name')?.value);
    formData.append('brand_image', this.angForm.get('brand_image')?.value);
    formData.append('id', this.id);

    this.brandservice.editBrand(this.id,formData).subscribe(data => {
      this.router.navigate(['brands']);
    });
  }

  
}

