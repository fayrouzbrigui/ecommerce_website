from django.db import models
from django.forms import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

class Brand(models.Model):
    brand_id = models.AutoField(primary_key=True)
    brand_name = models.CharField(null=True, max_length=200, blank=True)
    brand_image = models.ImageField(null=True, blank=True, upload_to='images/')
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.brand_name
    
    def get_image(self):
        if self.brand_image:
            return 'http://127.0.0.1:8000' + self.brand_image.url
        return ''

    class Meta:
        db_table = "Brand"



class MainCategory(models.Model):
    main_category_id = models.AutoField(primary_key=True)
    main_category_name = models.CharField(max_length=100)
    main_category_image = models.ImageField( null= True, blank=True, upload_to='images/')
    main_category_icon = models.ImageField( null= True, blank=True, upload_to='images/')
    createdAt =models.DateTimeField(auto_now_add=True)
                   


    def __str__(self):
        return self.main_category_name
    
    def get_image(self):
        if self.main_category_image:
            return 'http://127.0.0.1:8000' + self.main_category_image.url
        return ''
    
    def get_icon(self):
        if self.main_category_icon:
            return 'http://127.0.0.1:8000' + self.main_category_icon.url
        return ''
    
    class Meta:
        db_table = "MainCategory"



class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)
    main_category_id = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name='categories',null= True, blank=True)
    category_image = models.ImageField( null= True, blank=True, upload_to='images/')   
    category_icon = models.ImageField( null= True, blank=True, upload_to='images/') 
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.category_name
    
    def get_image(self):
        if self.category_image:
            return 'http://127.0.0.1:8000' + self.category_image.url
        return ''
    
    def get_icon(self):
        if self.category_icon:
            return 'http://127.0.0.1:8000' + self.category_icon.url
        return ''

    class Meta:
        db_table = "Category"



class SubCategory(models.Model):
    subcategory_id = models.AutoField(primary_key=True)
    subcategory_name = models.CharField(max_length=100)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    subcategory_image = models.ImageField( null= True, blank=True, upload_to='images/')  
    subcategory_icon = models.ImageField( null= True, blank=True, upload_to='images/')
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.subcategory_name
    
    def get_image(self):
        if self.subcategory_image:
            return 'http://127.0.0.1:8000' + self.subcategory_image.url
        return ''
    
    def get_icon(self):
        if self.subcategory_icon:
            return 'http://127.0.0.1:8000' + self.subcategory_icon.url
        return ''

    class Meta:
        db_table = "SubCategory"



class Keyword(models.Model):
    keyword_id = models.AutoField(primary_key=True)
    keyword_name = models.CharField(max_length=100)
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.keyword_name

    class Meta:
        db_table = "Keyword"



class Filter(models.Model):
    filter_id = models.AutoField(primary_key=True)
    filter_name = models.CharField(max_length=100)
    main_category_id = models.ManyToManyField(MainCategory, related_name='filters')
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.filter_name

    class Meta:
        db_table = "Filter"


class FilterOption(models.Model):
    filteroption_id = models.AutoField(primary_key=True)
    filteroption_name = models.CharField(max_length=100, blank=True)
    filter_id = models.ForeignKey(Filter, on_delete=models.CASCADE, related_name='options')
    createdAt =models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.filteroption_name

    class Meta:
        db_table = "FilterOption"



class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', null=True)    
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=200, null=True, blank=True)
    product_description =  models.TextField(null=True, blank=True)
    product_price = models.FloatField(null=True, blank=True)
    product_countStock = models.IntegerField(null=True, blank=True, default=0)
    product_image = models.ImageField( null= True, blank=True, upload_to='images/')
    main_category_id = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name='products')
    category_id = models.ForeignKey(Category,null=True, blank=True, on_delete=models.CASCADE, related_name='products')
    subcategory_id = models.ForeignKey(SubCategory, null= True, blank=True, related_name='products', on_delete=models.CASCADE)
    brand_id = models.ForeignKey(Brand, null= True, blank=True, related_name='products', on_delete=models.CASCADE)
    trending = models.BooleanField(default=False, null= True)
    filteroption_id = models.ManyToManyField(FilterOption, blank=True, related_name='products')
    related_products = models.ManyToManyField('self', blank=True, null= True)
    keyword_id = models.ManyToManyField(Keyword, blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)
    offer = models.BooleanField(default=False, null= True)
    deadline = models.DateTimeField(default=None, null=True)
   
    
    def clean(self):
        if self.category_id.main_category_id != self.main_category_id:
            raise ValidationError('Selected category does not belong to the main category of the product')
        if self.subcategory_id and self.subcategory_id.category_id.main_category_id != self.main_category_id:
            raise ValidationError('Selected subcategory does not belong to the main category of the product')
        if self.subcategory_id.category_id != self.category_id:
            raise ValidationError('Selected subcategory does not belong to the category of the product')
        if self.main_category_id.brand_id != self.brand_id:
            raise ValidationError('selected main category does not belong to the brand of the product')

    def __str__(self):
        return self.product_name
    
    def get_image(self):
        if self.product_image:
            return 'http://127.0.0.1:8000' + self.product_image.url
        return ''
    
    def get_order_count(self):
        return self.orderitem_set.count()

    class Meta:
        db_table = "Product"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image = models.ImageField( null= True, blank=True, upload_to='images/')

    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''


class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField(null= True)
    comment = models.TextField(max_length=500, null= True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def rating_stars(self):
        return '★' * self.rating + '☆' * (5 - self.rating)
    
    def clean(self):
        if self.rating is not None and (self.rating < 1 or self.rating > 5):
            raise ValidationError('Rating must be between 1 and 5.')
        
    def __str__(self):
        if self.user:
            return f"{self.user.username}'s Review"

    class Meta:
        db_table = "Review"


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=32, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def clear(self):
        self.items.all().delete()
        self.delete()

    def get_total_price(self):
        total_price = sum(item.get_total_price() for item in self.items.all())
        self.total_price = total_price
        self.save()
        return total_price
    
    def delete(self, *args, **kwargs):
        self.items.all().delete()
        super().delete(*args, **kwargs)


    def __str__(self):
        if self.user:
            return f"{self.user.username}'s Cart"
        else:
            return "Cart"
    
    class Meta:
        db_table = "Cart"


class CartItem(models.Model):
    cart_item_id = models.AutoField(primary_key=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_total_price(self):
        return self.product.product_price * self.quantity
    
    def increment_quantity(self):
        self.quantity += 1
        self.save()
        self.cart.get_total_price()

    def decrement_quantity(self):
        if self.quantity > 1:
            self.quantity -= 1
            self.save()
        else:
            self.delete()
        self.cart.get_total_price()

    
    def __str__(self):
        if self.cart.user:
            return f"Cart Item: {self.product.product_name} (Quantity: {self.quantity}) - User: {self.cart.user.username}"
        else:
            return f"Cart Item: {self.product.product_name} (Quantity: {self.quantity}) - No User"

    class Meta:
        db_table = "CartItem"


class Wishlist(models.Model):
    wishlist_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=32, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user:
            return f"{self.user.username}'s Wishlist"
        else:
            return "Wishlist"
    
    class Meta:
        db_table = "Wishlist"



class WishlistItem(models.Model):
    wishlist_item_id = models.AutoField(primary_key=True)
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='wishlistitems')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)

    def __str__(self):
        if self.cart.user:
            return f"Wishlist Item: {self.product.product_name} - User: {self.wishlist.user.username}"
        else:
            return f"Wishlist Item: {self.product.product_name} - No User"

    class Meta:
        db_table = "WishlistItem"


class Slider(models.Model):
    slider_id = models.AutoField(primary_key=True)
    slider_image = models.ImageField( null= True, blank=True, upload_to='images/')

    def __str__(self):
        return self.slider_id
    
    def get_image(self):
        if self.slider_image:
            return 'http://127.0.0.1:8000' + self.slider_image.url
        return ''

    class Meta:
        db_table = "Slider"


class Request(models.Model):
    PENDING = 'P'
    ACCEPTED ='A'
    REFUSED = 'R'
    REQUEST_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REFUSED, 'Refused'),
    ]
    request_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request', null=True)    
    client_name = models.CharField(max_length=255, blank=True, null= True )
    email = models.EmailField(max_length=30, blank=True, null= True)
    message = models.TextField(max_length=500, blank=True, null= True)
    status = models.CharField(max_length=15, choices=REQUEST_STATUS_CHOICES, default=PENDING, blank=True, null= True)

    def __str__(self):
        return self.client_name
    
    class Meta:
        db_table = "Request"


class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages', null=True)    
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True)    
    message = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.sender)
    
    class Meta:
        db_table = "Message"