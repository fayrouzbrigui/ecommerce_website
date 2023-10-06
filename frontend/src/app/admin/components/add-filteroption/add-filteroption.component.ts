import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterOptionService } from 'src/app/services/FilterOtionService/filter-option.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';

@Component({
  selector: 'app-add-filteroption',
  templateUrl: './add-filteroption.component.html',
  styleUrls: ['./add-filteroption.component.css']
})
export class AddFilteroptionComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
 filters: any;

  constructor(private fb: FormBuilder, private filterservice : FilterService, private filteroption : FilterOptionService, private router:Router){
    this.angForm = this.fb.group({
      filteroption_name: new FormControl('', Validators.required),
      filter_id:new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.fetchFilters();
  
  }

  fetchFilters(){
    this.filterservice.listFilters().subscribe((data) =>{
      this.filters = data;
      console.log(this.filters);
    })
  }



  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    
  }


  selectFilter(event:any){
    const filterId = event.target.value;
    const selectedFilter = this.filters.find((filter: any) => filter.filter_id === parseInt(filterId));
    if (selectedFilter) {
      console.log(`Selected filter: ${selectedFilter.filter_name}`);
    }
    this.angForm.get('filter_id')?.setValue(parseInt(filterId));
  }


  postdata(){

    const formData = new FormData();
    formData.append('filteroption_name', this.angForm.get('filteroption_name')?.value);
    formData.append('filter_id', this.angForm.get('filter_id')?.value || '');
    this.filteroption.addFilterOption(formData).subscribe(data => {
      this.router.navigate(['filters-options-list']);
    });
  }

}

