import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { ApiAdminService } from 'src/app/services/ApiAdminService/api-admin.service';

@Component({
  selector: 'app-super-interface',
  templateUrl: './super-interface.component.html',
  styleUrls: ['./super-interface.component.css']
})
export class SuperInterfaceComponent  implements OnInit {
  userInfo!: User;

  constructor(private userService: ApiAdminService) { }

  ngOnInit(): void {
    const token = this.userService.getToken();

    if (token) {
      this.userService.getAdminInfo(token).subscribe(
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
  
  
}

}
