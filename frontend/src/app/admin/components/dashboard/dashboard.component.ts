import { Component, OnInit} from '@angular/core';
import { OrderService } from 'src/app/services/OrderService/order.service';
import { UsersService } from 'src/app/services/UsersService/users.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { OrderItem, User } from 'src/app/models';
import { ApiSupplierService } from 'src/app/services/ApiSupplierService/api-supplier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
   
  count: number = 0;
  orders_count: number = 0;
  earning: number = 0;
  supplierInfo!: User;
  currentDate: Date = new Date();
  days: number[] = [];
  OrderItems : OrderItem []=[];
  constructor(private orderService: OrderService,  private userService : UsersService, private orderservice: OrderService, private productService:ProductService, private apiservice: ApiSupplierService){
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.userService.getUserCount().subscribe(count => {
      this.count = count;
    });

    this.orderservice.getOrdersCount().subscribe(orders_count => {
      this.orders_count = orders_count;
    });

    this.orderservice.getearning().subscribe(
      earnings => {
        console.log(earnings)
        this.earning = earnings;
        console.log(this.earning);
      },
      error => {
        console.error('Error occurred while fetching earnings:', error);
      }
    );

    const token = this.apiservice.getToken();

    if (token) {
      this.apiservice.getSupplierInfo(token).subscribe(
        (response) => {
          // Perform actions with the user info
          this.supplierInfo = response;
        },
        (error) => {
          console.log('Error fetching user info:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }

    const tokens = this.orderService.getToken();

    if(tokens){
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

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
  
    const days: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    const offset = firstDay.getDay();
    for (let i = 0; i < offset; i++) {
      days.unshift(-1);
    }
  
    this.days = days;
  }


  }
