import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupuserComponent } from './components/signupuser/signupuser.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { HeaderComponent } from './components/basics/header/header.component';
import { AdminSidebarComponent } from './components/basics/admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { UsersListComponent } from './admin/components/users-list/users-list.component';
import { BrandsListComponent } from './admin/components/brands-list/brands-list.component';
import { AddBrandComponent } from './admin/components/add-brand/add-brand.component';
import { MainCategoriesListComponent } from './admin/components/main-categories-list/main-categories-list.component';
import { SubCategoriesListComponent } from './admin/components/sub-categories-list/sub-categories-list.component';
import { CategoriesListComponent } from './admin/components/categories-list/categories-list.component';
import { AddMainCategoriesListComponent } from './admin/components/add-main-categories-list/add-main-categories-list.component';
import { AddCategoriesComponent } from './admin/components/add-categories/add-categories.component';
import { AddSubCategoriesComponent } from './admin/components/add-sub-categories/add-sub-categories.component';
import { EditSubCategoriesComponent } from './admin/components/edit-sub-categories/edit-sub-categories.component';
import { EditMainCategoriesComponent } from './admin/components/edit-main-categories/edit-main-categories.component';
import { EditCategoriesComponent } from './admin/components/edit-categories/edit-categories.component';
import { EditBrandsComponent } from './admin/components/edit-brands/edit-brands.component';
import { FiltersListComponent } from './admin/components/filters-list/filters-list.component';
import { FiltersOptionsListComponent } from './admin/components/filters-options-list/filters-options-list.component';
import { EditFiltersComponent } from './admin/components/edit-filters/edit-filters.component';
import { AddFilterComponent } from './admin/components/add-filter/add-filter.component';
import { AddFilteroptionComponent } from './admin/components/add-filteroption/add-filteroption.component';
import { EditFilteroptionComponent } from './admin/components/edit-filteroption/edit-filteroption.component';
import { ProductListComponent } from './admin/components/product-list/product-list.component';
import { EditProductComponent } from './admin/components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingAddressesComponent } from './components/shipping-addresses/shipping-addresses.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserSidebarComponent } from './components/basics/user-sidebar/user-sidebar.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AddressComponent } from './components/address/address.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { SignupsupplierComponent } from './admin/components/signupsupplier/signupsupplier.component';
import { SupplierloginComponent } from './admin/components/supplierlogin/supplierlogin.component';
import { RequestComponent } from './components/request/request.component';
import { SuperInterfaceComponent } from './superuser/super-interface/super-interface.component';
import { SuperuserSignupComponent } from './superuser/superuser-signup/superuser-signup.component';
import { SuperuserLoginComponent } from './superuser/superuser-login/superuser-login.component';
import { SendMessageComponent } from './superuser/send-message/send-message.component';
import { UsersRequestComponent } from './superuser/users-request/users-request.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { ProductsByMainCategComponent } from './components/products-by-main-categ/products-by-main-categ.component';
import { OrdersComponent } from './admin/components/orders/orders.component';
import { SuccessOrderComponent } from './components/success-order/success-order.component';
import { SuccessRequestComponent } from './components/success-request/success-request.component';













const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  { path:'home', component: HomeComponent },
  {path: 'header', component:HeaderComponent},
  { path:'user-signup', component: SignupuserComponent },
  { path:'user-login', component: UserloginComponent },
  { path:'admin-sidebar', component: AdminSidebarComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'add-products', component: AddProductComponent },
  {path:'product-list', component:ProductListComponent},
  { path:'edit-product/:id', component: EditProductComponent},
  { path:'users-list', component: UsersListComponent },
  { path:'brands', component: BrandsListComponent },
  { path:'add-brand', component: AddBrandComponent },
  { path:'main-categories', component: MainCategoriesListComponent },
  { path:'categories', component: CategoriesListComponent },
  { path:'sub-categories', component: SubCategoriesListComponent },
  { path:'add-main-categories', component: AddMainCategoriesListComponent },
  { path:'add-categories', component: AddCategoriesComponent },
  { path:'add-sub-categories', component: AddSubCategoriesComponent },
  { path:'edit-brand/:id', component: EditBrandsComponent },
  { path:'edit-main-category/:id', component: EditMainCategoriesComponent },
  { path:'edit-category/:id', component: EditCategoriesComponent },
  { path:'edit-subcategory/:id', component: EditSubCategoriesComponent },
  { path:'filters-list', component: FiltersListComponent},
  { path:'add-filter', component: AddFilterComponent},
  { path:'edit-filter/:id', component: EditFiltersComponent },
  { path:'filters-options-list', component: FiltersOptionsListComponent},
  { path:'add-filteroption', component: AddFilteroptionComponent},
  { path:'edit-filteroption/:id', component: EditFilteroptionComponent },
  {path:'product-details/:id', component:ProductDetailsComponent},
  {path:'user-profile', component:UserProfileComponent},
  {path:'cart', component:CartComponent},
  {path:'shipping-address', component:ShippingAddressesComponent},
  {path:'confirm-order', component:ConfirmOrderComponent},
  {path:'user-orders', component:UserOrdersComponent},
  {path:'user-sidebar', component:UserSidebarComponent},
  {path:'order-details/:id', component:OrderDetailsComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'address', component:AddressComponent},
  {path:'review/:id', component:AddReviewComponent},
  { path:'supplier-signup', component: SignupsupplierComponent },
  { path:'supplier-login', component: SupplierloginComponent },
  {path:'send-request', component:RequestComponent},
  {path:'admin-interface', component:SuperInterfaceComponent},
  {path:'admin-signup', component:SuperuserSignupComponent},
  {path:'admin-login', component:SuperuserLoginComponent},
  {path:'send-message', component:SendMessageComponent},
  {path:'users-request', component:UsersRequestComponent},
  {path:'user-messages', component:UserMessagesComponent},
  {path:'products/:mainCategoryId', component:ProductsByMainCategComponent},
  {path:'orders', component:OrdersComponent},
  {path:'success-order', component:SuccessOrderComponent},
  {path:'success-request', component:SuccessRequestComponent}






  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
