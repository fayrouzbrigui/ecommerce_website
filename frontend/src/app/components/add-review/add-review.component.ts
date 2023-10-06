import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderItem, Product } from 'src/app/models';
import { OrderService } from 'src/app/services/OrderService/order.service';
import { ReviewService } from 'src/app/services/ReviewService/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  product!:Product
  OrderItem!: OrderItem;
  id: any;
  angForm: FormGroup;
  selectedRatings: number[] = [];
  productId!: number;

  constructor(private route: ActivatedRoute, private activatedRoute: ActivatedRoute, private orderService: OrderService, private reviewService: ReviewService, private fb: FormBuilder){
    const productId = this.route.snapshot.params['id'];
    this.angForm = this.fb.group({
      comment: '',
      rating: '',
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);
      const token = this.orderService.getToken();
      if(token){
        this.orderService.getSingleOrderItem(token, this.id).subscribe(data=>{
          this.OrderItem = data;
        })
      }
     
    })
  }



  onRatingChange(rating : number) {
    this.angForm.get('rating')?.setValue(rating);
  }
  
  

  postdata(): void {
  
    const token = this.reviewService.getToken();

    if(token){
      const reviewData = this.angForm.value;
      const productId = this.OrderItem?.product?.product_id;
      this.reviewService.addReview(token, productId, reviewData).subscribe(
        (data) => {
          console.log(data)
          // Handle success response
          console.log('Review added successfully', data);
          // Optionally, you can reset the form here
          this.angForm.reset();
        },
        (error) => {
          // Handle error response
          console.log('Error adding review:', error);
        }
      );
    }else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
    
  }

}
