import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/FilterService/filter.service';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.css']
})
export class FiltersListComponent implements OnInit{

  showSidebar = true;
  filters: any;

  constructor(private  filterservice : FilterService){}
  ngOnInit(): void {
  
    this.fetchFilters();
  
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchFilters(){
    this.filterservice.listFilters().subscribe((data) =>{
      this.filters = data;
      console.log(this.filters);
    })
  }  

 deleteFilter(filter_id:any){
    this.filterservice.delFilter(filter_id).subscribe(()=>{
      this.fetchFilters();})
  }

}
