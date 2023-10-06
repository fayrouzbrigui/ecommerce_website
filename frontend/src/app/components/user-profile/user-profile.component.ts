import { Component, OnInit } from '@angular/core';
import {ShippingAddress, User, Request } from 'src/app/models';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { RequestService } from 'src/app/services/RequestService/request.service';
import { ShippingAddressService } from 'src/app/services/ShippingAddressesService/shipping-address.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo!: User;
  defaultaddress!: ShippingAddress;

  constructor(private requestservice: RequestService ,private userService: ApiService, private shippingAddressService: ShippingAddressService) { }

  ngOnInit(): void {
    const token = this.userService.getToken();

    if (token) {
      this.userService.getUserInfo(token).subscribe(
        (response) => {
          // Perform actions with the user info
          this.userInfo = response;
        },
        (error) => {
          console.log('Error fetching user info:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
  

    const tokens = this.shippingAddressService.getToken();

      if (tokens) {
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
  
}

}
