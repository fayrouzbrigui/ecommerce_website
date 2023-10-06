import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart!: Cart;
  cartItems!: any[];

  constructor( private cartservice: CartService) {}

  ngOnInit(): void {
    const token = this.cartservice.getToken();

    if (token) {
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

  deleteCartItem(cartItemId: number): void {
    this.cartservice.delete(cartItemId).subscribe(
      () => {
        console.log('Cart item deleted successfully.');
        const token = localStorage.getItem('fayrouz_auth')?? '';
        this.cartservice.getUserCart(token).subscribe(
          (cart: Cart) => {
            console.log('User cart retrieved:', cart);
            this.cart = cart;
          },
          (error: any) => {
            console.error('Error retrieving user cart:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error deleting cart item:', error);
      }
    );
  }

  incrementQuantity(cartItemId: number) {
    this.cartservice.incrementQuantity(cartItemId)
      .subscribe(
        (cart: Cart) => {
          // Update the corresponding cart item in this.cartItems with the updated quantity
          const updatedItem = this.cart.items.find(item => item.cart_item_id === cartItemId);
          if (updatedItem) {
            updatedItem.quantity += 1;
          }
          // Update the total price in the cart
       
            this.cart.total_price = cart.total_price;

        },
        (error) => {
          console.error('Error incrementing quantity:', error);
        }
      );
  }

  

  decrementQuantity(cartItemId: number) {
    this.cartservice.decrementQuantity(cartItemId)
      .subscribe(
        (cart: Cart) => {
          // Update the corresponding cart item in this.cartItems with the updated quantity
          const updatedItem = this.cart.items.find(item => item.cart_item_id === cartItemId);
          if (updatedItem) {
            updatedItem.quantity -= 1;
          }
          // Update the total price in the cart
            this.cart.total_price = cart.total_price;
       
        },
        (error) => {
          console.error('Error decrementing quantity:', error);
        }
      );
  }
}

  






