import { Component, OnInit} from '@angular/core';
import { Order, OrderItem } from 'src/app/models';
import { OrderService } from 'src/app/services/OrderService/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  OrderItems : OrderItem []=[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const token = this.orderService.getToken();

    if(token){
      this.orderService.getOrder(token).subscribe(
        (response) =>{
          this.OrderItems = response;
        },
        (error) =>{
          console.log('Error fetching user order items :', error);
        }
        );
    }else{
      console.log('Token is not available in localStorage');
    }
  }

  }

