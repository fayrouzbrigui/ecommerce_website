import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/models';
import { WishlistService } from 'src/app/services/WishlistService/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlist!: Wishlist;
  wishlistItems!: any[];

  constructor(private wishlistservice: WishlistService) {}

  ngOnInit(): void {
    const token = this.wishlistservice.getToken();

    if (token) {
      this.wishlistservice.getUserWishlist(token).subscribe(
        (response) => {
          // Perform actions with the user info
          this.wishlist = response;
        },
        (error) => {
          console.log('Error fetching user wishlist:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
  }

  
deleteWishlistItem(wishlistItemId: number): void {
  this.wishlistservice.delete(wishlistItemId).subscribe(
    () => {
      console.log('Wishlist item deleted successfully.');
      const token = localStorage.getItem('fayrouz_auth') ?? '';
      this.wishlistservice.getUserWishlist(token).subscribe(
        (wishlist: Wishlist) => {
          console.log('User wishlist retrieved:', wishlist);
          this.wishlist = wishlist;
        },
        (error: any) => {
          console.error('Error retrieving user wishlist:', error);
        }
      );
    },
    (error: any) => {
      console.error('Error deleting wishlist item:', error);
    }
  );
}

}

  






