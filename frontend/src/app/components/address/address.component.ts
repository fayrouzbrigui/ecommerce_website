import { Component, OnInit } from '@angular/core';
import { ShippingAddress } from 'src/app/models';
import { ShippingAddressService } from 'src/app/services/ShippingAddressesService/shipping-address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{

  shippingAddress: ShippingAddress[] = [];
  constructor(private shippingAddressService: ShippingAddressService){}

  ngOnInit(): void {
    const token = this.shippingAddressService.getToken();

    if (token) {
      this.shippingAddressService.getShippingAddres(token).subscribe(
        (response) => {
          // Perform actions with the user info
          this.shippingAddress = response;
        },
        (error) => {
          console.log('Error fetching user shipping address:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
  }
  
  setAsDefaultAddress(address: ShippingAddress): void {
    const token = this.shippingAddressService.getToken();
    
    if (token) {
      this.shippingAddressService.setShippingAddressAsDefault(token, address.shipping_address_id).subscribe(
        (response) => {
          // Handle success, update UI if needed
          console.log('Default shipping address set:', response);
          // Refresh the shipping addresses list if required
          this.shippingAddressService.getShippingAddres(token).subscribe(
            (addresses) => {
              this.shippingAddress = addresses;
            },
            (error) => {
              console.log('Error fetching user shipping addresses:', error);
            }
          );
        },
        (error) => {
          console.log('Error setting default shipping address:', error);
        }
      );
    } else {
      // Token is not available in localStorage
      console.log('Token is not available in localStorage');
    }
  }



}
