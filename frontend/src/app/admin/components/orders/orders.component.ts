import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models';
import { OrderService } from 'src/app/services/OrderService/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  OrderItems : OrderItem []=[];
  showSidebar = true;
  constructor(private orderService: OrderService){}

  ngOnInit(): void {

   this.fetchorders();
    
  }


  fetchorders(){
    const token = this.orderService.getToken();

    if(token){
      this.orderService.getOrderItem(token).subscribe(
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

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  updateStatus(orderItemId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderItemId, newStatus).subscribe(
      () => {
        console.log('Order status updated successfully.');
        this.fetchorders();
      },
      (error) => {
        console.error('Error updating order status:', error);
       
      }
    );
  }


}
