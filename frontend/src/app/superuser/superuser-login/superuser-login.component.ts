import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAdminService } from 'src/app/services/ApiAdminService/api-admin.service';

@Component({
  selector: 'app-superuser-login',
  templateUrl: './superuser-login.component.html',
  styleUrls: ['./superuser-login.component.css']
})
export class SuperuserLoginComponent {

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private api: ApiAdminService, private router: Router){}

  submitForm(){
    if(this.form.invalid){
      return;
    }

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      this.api.loginAdmin(username, password).subscribe((response) => {
        this.router.navigate(['admin-interface']);

      });   
    }
  }
  

}

