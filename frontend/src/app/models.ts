export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;

}

export interface Brand{
  brand_id: number;
  brand_name: string;
  brand_description: string;
  brand_image: string;
  createdAt: Date;
}

export interface MainCategory{

  main_category_id: number;
  main_category_name: string;
  main_category_image: string;
  main_category_icon: string;
  main_category_description: string;
  image_url:string;

  createdAt: Date;

}

export interface Category{
  category_id: number;
  category_name: string;
  main_category_id: MainCategory;
  category_description: string;
  category_image: string;
  category_icon: string;
  createdAt: Date;
}

export interface SubCategory{
  subcategory_id: number;
  subcategory_name: string;
  category_id: Category;
  subcategory_description: string;
  subcategory_image: string;
  subcategory_icon: string;
  createdAt: Date
}

export interface Keyword{
  keyword_id: number;
  keyword_name: string;
  createdAt: Date;
}

export interface Filter{
  filter_id: number;
  filter_name: string;
  main_category_id: MainCategory[];
  createdAt: Date;
}

export interface FilterOption{
  filteroption_id: number;
  filteroption_name: string;
  filter_id: Filter;
  createdAt: Date
}

export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_countStock: number;
  product_image: string;
  main_categ_img: string;
  image_url: string;
  main_category_id: MainCategory;
  category_id: Category;
  subcategory_id: SubCategory;
  brand_id: Brand;
  trending: boolean;
  filteroption_id: FilterOption[];
  keyword_id: Keyword[];
  createdAt: Date;
  offer: boolean;
  deadline: Date;
  images: ProductImage[];
  related_products : Product[];
  brand_name:string;
  reviews: Review[];
  order_count: number;
}

export interface Cart {
  cart_id: number;
  user: User | null;
  created_at: Date;
  updated_at: Date;
  total_price: number;
  session_id: string| null;
  items: CartItem[];
}

export interface CartItem {
  cart_item_id: number;
  cart: Cart | null;
  product:Product;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Slider{
  slider_id: number;
  slider_image: string;

}

export interface ShippingAddress{
  shipping_address_id : number;
  user : User;
  country : string;
  province : string;
  city : string;
  street : string;
  is_default: boolean;
}

export interface Request{
  request_id: number;
  user: User;
  client_name: string;
  email: string;
  status: string;

}

export interface PaymentMethod{
  payment_method_id: number;
  payment_method_name: string;
  payment_method_image: string;
  shipping_price: number;
  createdAt: Date;
}

export interface Order{
  order_id: number;
  user: User;
  cart: Cart;
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  total_price: number;
  transaction_id: string;
  status: string;
  order_items: OrderItem [];
  date_ordered: Date;  
}

export interface OrderItem{
  order_item_id: number;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
  status: string;
}

export interface Wishlist {
  wishlist_id: number;
  user: User | null;
  created_at: Date;
  updated_at: Date;
  session_id: string| null;
  wishlistitems: WishlistItem[];
}

export interface WishlistItem {
  wishlist_item_id: number;
  wishlist: Wishlist | null;
  product:Product;
  created_at: Date;
  updated_at: Date;
}

export interface Review{
  review_id: number;
  user: User;
  product_id: Product;
  rating: number;
  comment: string;
  created_at: Date;
  rating_stars:string;
}


export interface ProductImage{
  product:Product;
  image: string;
  image_url: string;
}

export interface Message{
  message_id :number,
  sender: User;
  receiver: User;
  message: string;
  sender_username: string;
}



