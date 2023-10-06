import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CategoriesService } from 'src/app/services/CategoriesService/categories.service';
import { FilterOptionService } from 'src/app/services/FilterOtionService/filter-option.service';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  showSidebar = true;
  angForm:FormGroup;
  categories: any;
  maincategories: any;
  subcategories: any;
  brands:any;
  filteroptions:any;
  selectedfilteroptionsIds: any[] = [];
  id:any;

 

  constructor( private activatedRoute: ActivatedRoute, private fb: FormBuilder, private productservice : ProductService, private optionservice: FilterOptionService, private router:Router, private categoryService : CategoriesService, private brandservice: BrandService){
    this.angForm = this.fb.group({
      product_name: '',
      product_description:'',
      product_price:'',
      product_countStock:'',
      product_image:'',
      brand_id:'',
      main_category_id:'',
      category_id:'',
      subcategory_id:'',
      trending:[false],
      offer:[false],
      filteroption_id: [[]],
      deadline:'',
    })
  }

  ngOnInit(): void {

    this.fetchCategory();
    this.fechBrands();
    this.fetchMainCategory();
    this.fetchSubcategory();
    this.fechOptions();

    this.activatedRoute.paramMap.subscribe(paramId=>{
      this.id = paramId.get('id');
      console.log(this.id);

      this.productservice.getSingleProduct(this.id).subscribe(data=>{
        this.angForm.patchValue(data);
      })
    })

  
  }

  fetchMainCategory(){
    this.categoryService.listMainCategories().subscribe((data) =>{
      this.maincategories = data;
      console.log(this.maincategories);
    })
  }

  fetchCategory(){
    this.categoryService.listCategories().subscribe((data) =>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  fetchSubcategory(){
    this.categoryService.listSubcategories().subscribe((data) =>{
      this.subcategories = data;
      console.log(this.subcategories);
    })
  }


  fechBrands(){
    this.brandservice.listBrands().subscribe((data)=>{
      this.brands = data;
      console.log(this.brands);
    })
  }

  fechOptions(){
    this.optionservice.listFilterOption().subscribe((data)=>{
      this.filteroptions = data;
      console.log(this.filteroptions);
    })
  }


 
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('product_image')?.setValue(file);
    }
  }

  selectMainCategory(event:any){
    const MainCategoryId = event.target.value;
    const selectMainCategory = this.maincategories.find((category: any) => category.main_category_id === parseInt(MainCategoryId));
    if (selectMainCategory) {
      console.log(`Selected main category: ${selectMainCategory.main_category_name}`);
    }
    this.angForm.get('main_category_id')?.setValue(parseInt(MainCategoryId));
  }

  selectCategory(event:any){
    const CategoryId = event.target.value;
    const selectCategory = this.categories.find((category: any) => category.category_id === parseInt(CategoryId));
    if (selectCategory) {
      console.log(`Selected category: ${selectCategory.main_category_name}`);
    }
    this.angForm.get('category_id')?.setValue(parseInt(CategoryId));
  }

  selectSubcategory(event:any){
    const SubcategoryId = event.target.value;
    const selectSubcategory = this.subcategories.find((category: any) => category.subcategory_id === parseInt(SubcategoryId));
    if (selectSubcategory) {
      console.log(`Selected subcategory: ${selectSubcategory.subcategory_name}`);
    }
    this.angForm.get('subcategory_id')?.setValue(parseInt(SubcategoryId));
  }

  selectBrand(event:any){
    const brandId = event.target.value;
    const selectedBrand = this.brands.find((brand: any) => brand.brand_id === parseInt(brandId));
    if (selectedBrand) {
      console.log(`Selected brand: ${selectedBrand.brand_name}`);
    }
    this.angForm.get('brand_id')?.setValue(parseInt(brandId));
  }




  postdata(){


    const formData = new FormData();
    formData.append('product_name', this.angForm.get('product_name')?.value);
    formData.append('product_description', this.angForm.get('product_description')?.value);
    formData.append('product_image', this.angForm.get('product_image')?.value);
    formData.append('product_price', this.angForm.get('product_price')?.value);
    formData.append('product_countStock', this.angForm.get('product_countStock')?.value);
    formData.append('main_category_id', this.angForm.get('main_category_id')?.value || '');
    formData.append('category_id', this.angForm.get('category_id')?.value || '');
    formData.append('subcategory_id', this.angForm.get('subcategory_id')?.value || '');
    formData.append('brand_id', this.angForm.get('brand_id')?.value || '');
    formData.append('trending', this.angForm.get('trending')?.value);
    formData.append('offer', this.angForm.get('offer')?.value);
    const deadlineValue = this.angForm.get('deadline')?.value;
    const formattedDeadline = new Date(deadlineValue).toISOString();
    this.angForm.get('deadline')?.setValue(formattedDeadline);
    this.selectedfilteroptionsIds.forEach(id => {
      formData.append('filteroption_id', id.toString());
    });
    
    this.productservice.editProduct(this.id,formData).subscribe(data => {
      this.router.navigate(['product-list']);
    });

    

  }

  
}

