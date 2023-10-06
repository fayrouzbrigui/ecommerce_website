import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, ShippingAddress } from 'src/app/models';
import { OrderService } from 'src/app/services/OrderService/order.service';
import { PaymentMethodService } from 'src/app/services/PaymentMethodService/payment-method.service';
import { ShippingAddressService } from 'src/app/services/ShippingAddressesService/shipping-address.service';
import { CartService } from 'src/app/services/cartservice/cart.service';
import { NotificationService } from 'src/app/services/notificationServivice/notification.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit{

  methods: any;
  angForm:FormGroup;
  defaultaddress!: ShippingAddress;
  cart!: Cart;
  cartItems!: any[];

  
  constructor(private router:Router,private cartservice: CartService, private paymentservice: PaymentMethodService, private fb: FormBuilder, private shippingAddressService: ShippingAddressService, private orderService: OrderService){
    this.angForm = this.fb.group({

      payment_method:'',
     
    })
  }

  ngOnInit(): void {
    this.fetchPaymentMethod();

    const token = this.shippingAddressService.getToken();

    if (token) {
      this.shippingAddressService.getDefaultShippingAddres(token).subscribe(
        (response) => {
          this.defaultaddress = response;
        },
        (error) => {
          console.log('Error fetching user default shipping address:', error);
        }
      );
    } else {
      console.log('Token is not available in localStorage');
    }
    
    const tokens = this.cartservice.getToken();

    if (tokens) {
      this.cartservice.getUserCart(token).subscribe(
        (response) => {
          console.log(response);
          // Perform actions with the user info
          this.cart = response;
        },
        (error) => {
          console.log('Error fetching user cart:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }

    
  }

  fetchPaymentMethod(){
    this.paymentservice.listPaymentMethod().subscribe((data) =>{
      this.methods = data;
      console.log(this.methods);
    })
  }

  selectPaymentMethod(event:any){
    const MethodId = event.target.value;
    const selectedPaymentMethod = this.methods.find((method: any) => method.payment_method_id === parseInt(MethodId));
    if (selectedPaymentMethod) {
      console.log(`Selected payment method: ${selectedPaymentMethod.payment_method_name}`);
    }
    this.angForm.get('payment_method_id')?.setValue(parseInt(MethodId));
  }

  confirmorder() {
    const token = this.shippingAddressService.getToken();
    const paymentMethodId = this.angForm.value.payment_method;
    if (token && paymentMethodId) {
      const orderData = {
        payment_method: paymentMethodId
      } 
  
      this.orderService.passOrder(token, orderData).subscribe(
        (response) => {
          console.log('Order confirmed successfully:', response);
        },
        (error) => {
          console.log('Error confirming order:', error);
          this.router.navigate(['success-order']);
        }
      );
    } else {
      console.log('Token is not available in localStorage or payment method is not selected');
    }
  }


}
