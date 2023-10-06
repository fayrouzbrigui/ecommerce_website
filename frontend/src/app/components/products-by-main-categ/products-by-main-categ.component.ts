import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainCategory, Product } from 'src/app/models';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-products-by-main-categ',
  templateUrl: './products-by-main-categ.component.html',
  styleUrls: ['./products-by-main-categ.component.css']
})
export class ProductsByMainCategComponent implements OnInit{

  products: Product[] = [];
  category: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoriesservice : CategoriesService){}
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const mainCategoryId = params['mainCategoryId'];
      this.productService.getProductsByMainCategory(mainCategoryId).subscribe(
        products => {
          this.products = products;
        },
        error => {
          console.error(error);
        }
      );
    });

  }

}
