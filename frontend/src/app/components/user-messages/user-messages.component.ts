import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models';
import { MessageService } from 'src/app/services/MessageService/message.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {
  
  messages : Message[]= [];

 constructor(private messageservice: MessageService){}

 ngOnInit(): void {
  const token = this.messageservice.getToken();
  if(token){
    this.messageservice.getMessages(token).subscribe(
      (response: Message[]) => {
        this.messages = response;
      },
      (error) => {
        console.log('Error fetching user messages:', error);
      }
    );
    
  }else{
    // Token is not available in localStorage
    console.log('Token is not available in localStorage');
  }
 }

}
