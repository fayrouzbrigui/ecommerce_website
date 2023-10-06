import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/MessageService/message.service';
import { UsersService } from 'src/app/services/UsersService/users.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit{
  users:any;
  angForm:FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService, private messageService : MessageService){
    this.angForm = this.fb.group({
     receiver:'',
     message:'',
    })
  }

  ngOnInit(): void {

    this.fetchUsers();
    
  }

  fetchUsers(){
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  selectReceiver(event:any){
    const ReceiverId = event.target.value;
    const selectReceiver = this.users.find((user: any) => user.id === parseInt(ReceiverId));
    if (selectReceiver) {
      console.log(`Selected user: ${selectReceiver.username}`);
    }
    this.angForm.get('id')?.setValue(parseInt(ReceiverId));
  }

  postdata(){
    const token = this.userService.getToken();
    if(token){
      const message = this.angForm.value;
      this.messageService.send(token, message).subscribe(
        (data) => {
          console.log('Message Sended Successfully:', data);
          
        },
        (error) => {
          console.log('Error sending message:', error);
        }
      );
    } else {
      console.log('Token is not available in localStorage');
    }
  }

}
