import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, MainCategory, Slider, Wishlist } from 'src/app/models';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { SlidersService } from 'src/app/services/Sliders/sliders.service';
import { WishlistService } from 'src/app/services/WishlistService/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  maincategories:any;
  brands:any;
  sliders: any;
  selectedMainCategory:any;
  selectedCategory:any;
  categoriesDisplayed = false;
  subcategoriesDisplayed = false;
  id!: number;
  currentSlide = 0;
  intervalId: any;
  trends: any;
  offers:any;
  products:any;
  currentPage = 1;
  itemsPerPage = 10;
  totalItems!: number;
  countdown: any;
  constructor( private router: Router, private wishlistservice: WishlistService, private apiService: ApiService, private productservice: ProductService, private categservice : CategoriesService, private brandservice: BrandService, private sliderservice: SlidersService){
  
  }

  ngOnInit(): void {
    this.fetchBrands();
    this.fetchMainCategories();
    this.fetchsliders();
    this.fetchTrends();
    this.fetchOffers();
    this.fetchProducts();

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide++;
    if (this.currentSlide >= this.sliders.length) {
      this.currentSlide = 0;
    }
  }

  pauseAutoPlay() {
    clearInterval(this.intervalId);
  }
  
  resumeAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  fetchMainCategories(){
    this.categservice.listMainCategories().subscribe((data)=>{
      this.maincategories = data;
      console.log(this.maincategories);
    })
  }

 onSelectMainCategory(mainCategory: MainCategory): void {
    if (this.selectedMainCategory && this.selectedMainCategory.main_category_id === mainCategory.main_category_id) {
      this.categoriesDisplayed = !this.categoriesDisplayed;
    } else {
      this.categoriesDisplayed = true;
      this.subcategoriesDisplayed = false; // add this line
      this.selectedMainCategory = mainCategory;
      this.categservice.getCategoryByMainCategoryId(mainCategory.main_category_id)
        .then(categories => this.selectedMainCategory.categories = categories)
        .catch(error => console.log(error));
    }
  }

  onSelectCategory(category: Category): void {

    if (this.selectedCategory && this.selectedCategory.category_id === category.category_id) {
      this.subcategoriesDisplayed = !this.subcategoriesDisplayed;
    } else {
      this.subcategoriesDisplayed = true;
      this.categoriesDisplayed = false;
      this.selectedCategory = category;
      this.categservice.getSubcategoryByCategoryId(category.category_id)
        .then(subcategories => this.selectedCategory.subcategories = subcategories)
        .catch(error => console.log(error));
    }
    this.categoriesDisplayed = false;

  }

  fetchsliders(){
    this.sliderservice.listSliders().subscribe((data) => {
      this.sliders = data;
      console.log(this.sliders);
    });
  }
  

  fetchBrands(){
    this.brandservice.listBrands().subscribe((data) =>{
      this.brands = data;
      console.log(this.brands);
    })
  }


  fetchTrends(){
    this.productservice.listTrends().subscribe((data)=>{
      this.trends = data;
      console.log(this.trends);

    })
  }

  fetchProducts(){
    this.productservice.listProducts().subscribe((data)=>{
      this.products = data;
      console.log(this.products);

    })
  }

  fetchOffers() {
    this.productservice.listOffers().subscribe((data) => {
      this.offers = data;
      console.log(this.offers);
  
 });

}

addToWishlist(productId: number): void {
  if (this.apiService.isLoggedIn()) {
    this.addToLoggedInUserWishlist(productId);
  } else {
    this.addToAnonymousWishlist(productId);
  }
}

  addToLoggedInUserWishlist(productId: number): void {
    
    this.wishlistservice.addToWishlist(productId).subscribe(
      () => {
        console.log('Product added to wishlist successfully');
        this.router.navigate(['/wishlist']);
       
      },
      (error) => {
        console.error('Failed to add product to wishlist:', error);
        
      }
    );
  }


  addToAnonymousWishlist(productId: number): void {
    this.wishlistservice.createWishlist().subscribe(
      (wishlist: Wishlist) => {
        const wishlistId = wishlist.wishlist_id;
  
        this.wishlistservice.addToWishlist(productId, wishlistId, productId).subscribe(
          () => {
            console.log('Product added to wishlist successfully');
            this.router.navigate(['/wishlist']);
          },
          (error) => {
            console.error('Failed to add product to wishlist:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to create wishlist:', error);
      }
    );
  }


}
