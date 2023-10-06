import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/BrandService/brand.service';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit{

  showSidebar = true;
  brands: any

  constructor(private brandservice : BrandService){}

  ngOnInit(): void {
    this.fetchBrands();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchBrands(){
    this.brandservice.listBrands().subscribe((data) =>{
      this.brands = data;
      console.log(this.brands);
    })
  }

  deleteBrand(brand_id:any){
    this.brandservice.delBrand(brand_id).subscribe(()=>{
      this.fetchBrands();})
  }

}
