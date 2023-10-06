import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private api: ApiService, private router: Router){}

  submitForm(){
    if(this.form.invalid){
      return;
    }

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      this.api.loginUser(username, password).subscribe((response) => {
        this.router.navigate(['home']);

      });   
    }
  }
  

}
