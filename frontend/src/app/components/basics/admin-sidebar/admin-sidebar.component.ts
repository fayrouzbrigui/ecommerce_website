import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { ApiSupplierService } from 'src/app/services/ApiSupplierService/api-supplier.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

 supplierInfo!: User;
 show = false;

  constructor(private userService: ApiSupplierService){}

  ngOnInit(): void {
    const token = this.userService.getToken();

    if (token) {
      this.userService.getSupplierInfo(token).subscribe(
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
  
  }

  toggle(){
    this.show = !this.show;
  }

}
