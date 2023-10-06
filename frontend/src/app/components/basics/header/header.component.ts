import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService/api.service';
import { SearchService } from 'src/app/services/searchservice/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showMenu: boolean = false;
  searchQuery!: string;
  products!: any[];
  productClicked: boolean = false;
  constructor(private searchservice : SearchService, private apiService: ApiService, private router: Router){}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  handleProductClick(): void {
    this.productClicked = true;
  }

  searchProducts(): void {
      if (this.searchQuery) {
        this.searchservice.search(this.searchQuery).subscribe(
          (data: Object) => {
            this.products = data as any[]; // Type assertion to any[]
            console.log(data); // Log the response data to the console
          },
          (error) => {
            console.log(error); // Log any errors to the console
          }
        );
      } else {
        this.products = [];
      }
  }

  logout() {
    if (!this.apiService.isLoggedIn()) {
      console.log("User is already logged out");
      this.router.navigate(['/user-login']);
      return;
    }

      this.apiService.logoutUser();
      this.router.navigate(['/home']);
  }


  
}




