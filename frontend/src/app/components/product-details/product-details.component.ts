import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Product } from 'src/app/models';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { ReviewService } from 'src/app/services/ReviewService/review.service';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{  
  product!:Product
  id:any;
  productId!: number;
  cartId!: number;
  quantity: number = 1;
  cartItems: Product[] = []; // Define cartItems property
  selectedImage!: string;
  productUrl: string;
  angForm: FormGroup;
  selectedRatings: number[] = [];
  
  constructor(private socialMediaService: ProductService, private activatedRoute: ActivatedRoute, private apiService: ApiService, private route: ActivatedRoute, private productservice: ProductService, private cartservice: CartService, private router: Router, private formBuilder: FormBuilder,
    private reviewService: ReviewService, private fb: FormBuilder){
    const productId = this.route.snapshot.params['id'];
    this.productUrl = `http://localhost:4200/product-details/${productId}`;

    this.angForm = this.fb.group({
      comment: '',
      rating: '',
    });
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.productservice.getSingleProduct(this.id).subscribe(data=>{
        this.product = data;
      })
    })
    
    this.selectedImage = this.product.product_image;

   
   
  }

  addToCart(productId: number): void {
    if (this.apiService.isLoggedIn()) {
      // User is logged in, add item to their cart
      this.addToLoggedInUserCart(productId);
    } else {
      // User is not logged in, add item to the anonymous cart
      this.addToAnonymousCart(productId);
    }
  }

  addToLoggedInUserCart(productId: number): void {
    
    this.cartservice.addToCart(productId).subscribe(
      () => {
        // Success message or any additional logic
        console.log('Product added to cart successfully');
        this.router.navigate(['/cart']);
      },
      (error) => {
        // Error handling
        console.error('Failed to add product to cart:', error);
      }
    );
  }


  addToAnonymousCart(productId: number): void {
    this.cartservice.createCart().subscribe(
      (cart: Cart) => {
        const cartId = cart.cart_id;
  
        this.cartservice.addToCart(productId, cartId, productId).subscribe(
          () => {
            // Success message or any additional logic
            console.log('Product added to cart successfully');
            this.router.navigate(['/cart']);
          },
          (error) => {
            // Error handling
            console.error('Failed to add product to cart:', error);
          }
        );
      },
      (error) => {
        // Error handling for cart creation
        console.error('Failed to create cart:', error);
      }
    );
  }

  selectImage(image: any) {
    this.selectedImage = image.image_url;
  }

  shareOnFacebook(): void {
    this.socialMediaService.shareOnFacebook(this.productUrl);
  }

}
  
 
