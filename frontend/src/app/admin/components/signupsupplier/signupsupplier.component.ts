import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupSupplierService } from 'src/app/services/SignupSupplier/signup-supplier.service';

@Component({
  selector: 'app-signupsupplier',
  templateUrl: './signupsupplier.component.html',
  styleUrls: ['./signupsupplier.component.css']
})
export class SignupsupplierComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder,private signupsupplierservice: SignupSupplierService, private router: Router, private http: HttpClient){
  
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }
  
  get f(){return this.signupForm.controls;}
  
  ngOnInit(): void {
  
    this.signupForm = new FormGroup({
      'first_name': new FormControl(),
      'last_name': new FormControl(),
      'username': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      
    })
    
  }
  
  onSubmit(signupForm: FormGroup) {
    console.log(this.signupForm.value);
    // send POST request to backend to create user using this.signupForm.value
    this.signupsupplierservice.signupsupplier(this.signupForm.value)
    .subscribe(
      response => {
        console.log(response);
        // navigate to Home page after successful sign up
        this.router.navigate(['supplier-login']);
      },
      error => console.log(error)
    );
  
  }
  }
  
  
