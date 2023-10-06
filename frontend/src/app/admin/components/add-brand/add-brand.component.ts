import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;

  constructor(private fb: FormBuilder, private brandservice : BrandService, private router:Router){
    this.angForm = this.fb.group({
      brand_name: '',
      brand_image: '',
    })
  }

  ngOnInit(): void {
  
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

    this.brandservice.AddBrand(formData).subscribe(data => {
      this.router.navigate(['brands']);
    });
  }

  
}
