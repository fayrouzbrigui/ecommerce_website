import { Component, OnInit } from '@angular/core';
import { ShippingAddress } from 'src/app/models';
import { ShippingAddressService } from 'src/app/services/ShippingAddressesService/shipping-address.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-addresses',
  templateUrl: './shipping-addresses.component.html',
  styleUrls: ['./shipping-addresses.component.css']
})
export class ShippingAddressesComponent implements OnInit {
  angForm:FormGroup;
  constructor(private shippingAddressService: ShippingAddressService, private fb: FormBuilder, private router:Router) {
    this.angForm = this.fb.group({
      country: '',
      province: '',
      city: '',
      street:'',
    })

  }

  ngOnInit(): void {
  }

  
  
  postdata(): void {
    const token = this.shippingAddressService.getToken();
  
    if (token) {
      const newaddress = this.angForm.value;
  
      this.shippingAddressService.addShippingAddress(token, newaddress).subscribe(
        (data) => {
          console.log('New shipping address added:', data);
          this.router.navigate(['address']);
          
        },
        (error) => {
          console.log('Error adding new shipping address:', error);
        }
      );
    } else {
      console.log('Token is not available in localStorage');
    }
  }
}