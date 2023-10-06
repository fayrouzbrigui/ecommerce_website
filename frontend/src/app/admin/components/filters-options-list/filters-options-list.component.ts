import { Component, OnInit } from '@angular/core';
import { FilterOptionService } from 'src/app/services/FilterOtionService/filter-option.service';

@Component({
  selector: 'app-filters-options-list',
  templateUrl: './filters-options-list.component.html',
  styleUrls: ['./filters-options-list.component.css']
})
export class FiltersOptionsListComponent implements OnInit{

  showSidebar = true;
  options: any;

  constructor(private  filteroption : FilterOptionService){}

  ngOnInit(): void {
    this.fetchOptions();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  fetchOptions(){
    this.filteroption.listFilterOption().subscribe((data) =>{
      this.options = data;
      console.log(this.options);
    })
  }

  deleteOption(filteroption_id:any){
    this.filteroption.delFilterOption(filteroption_id).subscribe(()=>{
      this.fetchOptions();})
  }

}

