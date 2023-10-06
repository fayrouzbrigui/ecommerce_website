import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
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
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ShippingAddressesComponent } from './components/shipping-addresses/shipping-addresses.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserSidebarComponent } from './components/basics/user-sidebar/user-sidebar.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { FooterComponent } from './components/basics/footer/footer.component';
import { AddressComponent } from './components/address/address.component';
import { SignupsupplierComponent } from './admin/components/signupsupplier/signupsupplier.component';
import { SupplierloginComponent } from './admin/components/supplierlogin/supplierlogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChunkPipe } from './chunk.pipe';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupuserComponent,
    UserloginComponent,
    HeaderComponent,
    AdminSidebarComponent,
    DashboardComponent,
    AddProductComponent,
    UsersListComponent,
    BrandsListComponent,
    AddBrandComponent,
    MainCategoriesListComponent,
    SubCategoriesListComponent,
    CategoriesListComponent,
    AddMainCategoriesListComponent,
    AddCategoriesComponent,
    AddSubCategoriesComponent,
    EditSubCategoriesComponent,
    EditMainCategoriesComponent,
    EditCategoriesComponent,
    EditBrandsComponent,
    FiltersListComponent,
    FiltersOptionsListComponent,
    EditFiltersComponent,
    AddFilterComponent,
    AddFilteroptionComponent,
    EditFilteroptionComponent,
    ProductListComponent,
    EditProductComponent,
    ProductDetailsComponent,
    UserProfileComponent,
    CartComponent,
    ShippingAddressesComponent,
    ConfirmOrderComponent,
    UserOrdersComponent,
    UserSidebarComponent,
    OrderDetailsComponent,
    WishlistComponent,
    AddReviewComponent,
    FooterComponent,
    AddressComponent,
    SignupsupplierComponent,
    SupplierloginComponent,
    ChunkPipe,
    RequestComponent,
    SuperInterfaceComponent,
    SuperuserSignupComponent,
    SuperuserLoginComponent,
    SendMessageComponent,
    UsersRequestComponent,
    UserMessagesComponent,
    ProductsByMainCategComponent,
    OrdersComponent,
    SuccessOrderComponent,
    SuccessRequestComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
