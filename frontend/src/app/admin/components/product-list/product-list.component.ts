import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  showSidebar = true;
  products:any;

  constructor(private  productservice : ProductService){}

  ngOnInit(): void {

    this.fechproducts();
    
  }

  fechproducts(){
    const token = this.productservice.getToken();

    if (token) {
      this.productservice.getProducts(token).subscribe(
        (response) => {
          // Perform actions with the user info
          this.products = response;
        },
        (error) => {
          console.log('Error fetching user shipping address:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  deleteProduct(product_id:any){
    this.productservice.delProduct(product_id).subscribe(()=>{
      this.fechproducts();})
  }



}

