import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/UsersService/users.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  angForm:FormGroup;

  constructor(private router:Router,private userService: UsersService, private fb: FormBuilder){
    this.angForm = this.fb.group({
      client_name: '',
      email: '',
      message: '',
    })
  }

  ngOnInit(): void {
    
  }

  postdata(): void {
    const token = this.userService.getToken();
  
    if (token) {
      const request = this.angForm.value;
  
      this.userService.send(token, request).subscribe(
        (data) => {
          console.log('Request Sended Successfully:', data);
          this.router.navigate(['success-request']);
          
        },
        (error) => {
          console.log('Error sending request:', error);
        }
      );
    } else {
      console.log('Token is not available in localStorage');
    }
  }

}
