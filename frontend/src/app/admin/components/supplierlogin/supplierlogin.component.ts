import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSupplierService } from 'src/app/services/ApiSupplierService/api-supplier.service';

@Component({
  selector: 'app-supplierlogin',
  templateUrl: './supplierlogin.component.html',
  styleUrls: ['./supplierlogin.component.css']
})
export class SupplierloginComponent  {

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private api: ApiSupplierService, private router: Router){}

  submitForm(){
    if(this.form.invalid){
      return;
    }

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      this.api.loginSupplier(username, password).subscribe((response) => {
        this.router.navigate(['dashboard']);

      });   
    }
  }
  

}

