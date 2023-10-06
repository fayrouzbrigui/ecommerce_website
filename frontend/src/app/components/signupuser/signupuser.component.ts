import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupUserService } from 'src/app/services/SignupUser/signup-user.service';
import { NotificationService } from 'src/app/services/notificationServivice/notification.service';

@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrls: ['./signupuser.component.css']
})
export class SignupuserComponent implements OnInit {

signupForm: FormGroup;
submitted = false;
successMessage!: string;

constructor(private notificationService: NotificationService, private fb: FormBuilder,private signupuserservice: SignupUserService, private router: Router, private http: HttpClient){

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

  this.notificationService.getNotification().subscribe(message => {
    this.successMessage = message;
});
  
}

onSubmit(signupForm: FormGroup) {
  console.log(this.signupForm.value);
  // send POST request to backend to create user using this.signupForm.value
  this.signupuserservice.signupuser(this.signupForm.value)
  .subscribe(
    response => {
      console.log(response);
      this.router.navigate(['user-login']);
      this.notificationService.setNotification('User added successfuly');
     
    },
    error => console.log(error)
  );

}
}

