import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/models';
import { UsersService } from 'src/app/services/UsersService/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  showSidebar = true;
  users: any;
  user !: User[];

  constructor(private userService: UsersService, private http: HttpClient){}
  
  ngOnInit(): void {
   this.fetchUsers();
  }

  fetchUsers(){
    this.userService.getUsers().subscribe((data) => {
      console.log(data)
      this.users = data;
    });
  }

  deleteUser(id:any){
    this.userService.delUser(id).subscribe(()=>{
      this.fetchUsers();})
  }


  updateUserIsSupplier(userId: number, isSupplier: boolean): void {
    const apiUrl = `http://127.0.0.1:8000/products/users/${userId}/`;
  
    const data = { is_supplier: isSupplier };
  this.http.patch(apiUrl, data)
    .subscribe(
      () => {
        // Handle success
        console.log('User is_supplier updated successfully.');
        // Optionally, you can update the user's is_staff value in the frontend
        const user = this.users.find((u:any) => u.id === userId);
        if (user) {
          user.is_staff = isSupplier;
        }
      },
      (error) => {
        // Handle error
        console.error('Error updating user is_supplier:', error);
      }
    );

  }



}
