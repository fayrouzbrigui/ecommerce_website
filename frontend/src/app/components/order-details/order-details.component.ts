import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem } from 'src/app/models';
import { OrderService } from 'src/app/services/OrderService/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  OrderItem!: OrderItem;
  id: any;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService){}

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

 

}
