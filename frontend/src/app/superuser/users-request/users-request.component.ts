import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/RequestService/request.service';

@Component({
  selector: 'app-users-request',
  templateUrl: './users-request.component.html',
  styleUrls: ['./users-request.component.css']
})
export class UsersRequestComponent implements OnInit{
  requests : any;
  constructor(private requestservice : RequestService ){}

  ngOnInit(): void {

    this.fetchRequests();
    
  }

 fetchRequests(){
    this.requestservice.listRequests().subscribe((data) =>{
      this.requests = data;
      console.log(this.requests);
    })
  }

  updateStatus(requestId: number, status: string): void {
    this.requestservice.updateRequestStatus(requestId, status).subscribe(
      () => {
        console.log('Request status updated successfully.');
        this.fetchRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
        // Handle error
      }
    );
  }

}
