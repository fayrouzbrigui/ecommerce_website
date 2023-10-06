from django.db import models
from django.contrib.auth import get_user_model
from products.models import Cart, CartItem, Product
from decimal import Decimal
import uuid

User = get_user_model()


class PaymentMethod(models.Model):
    payment_method_id = models.AutoField(primary_key=True)
    payment_method_name = models.CharField(max_length=50, null= True, blank=True)
    payment_method_image = models.ImageField(null= True, blank=True, upload_to='images/')
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2, null= True)
    createdAt =models.DateTimeField(auto_now_add=True)

    def get_image(self):
        if self.payment_method_image:
            return 'http://127.0.0.1:8000' + self.payment_method_image.url
        return ''

    def __str__(self):
        return self.payment_method_name

    class Meta:
        db_table = "PaymentMethod"


class ShippingAddress(models.Model):
    shipping_address_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shipping_addresses', null=True)    
    country = models.CharField(max_length=50, null= True, blank=True)
    province = models.CharField(max_length=50, null= True, blank=True)
    city = models.CharField(max_length=50, null= True, blank=True)
    street = models.CharField(max_length=50, null= True, blank=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.country}, {self.province}, {self.city}, {self.street}"

    class Meta:
        db_table = "ShippingAddress"


class Order(models.Model):
    PENDING = 'P'
    CONFIRMED = 'C'
    SHIPPED = 'S'
    DELIVERED = 'D'
    CANCELED = 'X'
    ORDER_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELED, 'Canceled'),
    ]

    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    cart= models.OneToOneField(Cart,on_delete=models.SET_NULL, null=True)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.PROTECT, null=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.PROTECT, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    transaction_id = models.CharField(max_length=255, unique=True, null=True, blank=True, default=uuid.uuid4)
    status = models.CharField(max_length=1, choices=ORDER_STATUS_CHOICES, default=PENDING)
    date_ordered = models.DateTimeField(auto_now_add=True)
    date_confirmed = models.DateTimeField(null=True, blank=True)
    date_shipped = models.DateTimeField(null=True, blank=True)
    date_delivered = models.DateTimeField(null=True, blank=True)
    date_canceled = models.DateTimeField(null=True, blank=True)

    def get_total_price(self):
        order_items_total = sum(item.get_price() for item in self.order_items.all())
        shipping_price = Decimal(str(self.payment_method.shipping_price))  # Convert to Decimal
        total_price = float(order_items_total) + float(shipping_price)
        self.total_price = Decimal(str(total_price))
        self.save()
        return self.total_price
    
    def __str__(self):
        return f"Order #{self.order_id} - {self.status}"

    class Meta:
        db_table = "Order"


class OrderItem(models.Model):
    PENDING = 'P'
    CONFIRMED = 'C'
    SHIPPED = 'S'
    DELIVERED = 'D'
    CANCELED = 'X'
    ORDERITEM_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELED, 'Canceled'),
    ]

    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items', null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, related_query_name='order_item')
    quantity = models.IntegerField(default=1, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    status = models.CharField(max_length=1, choices=ORDERITEM_STATUS_CHOICES, default=PENDING, null=True)
    date_confirmed = models.DateTimeField(null=True, blank=True)
    date_shipped = models.DateTimeField(null=True, blank=True)
    date_delivered = models.DateTimeField(null=True, blank=True)
    date_canceled = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk is None:
            cart_item = CartItem.objects.get(product=self.product, cart=self.order.cart)
            self.quantity = cart_item.quantity

        super().save(*args, **kwargs)

    def get_price(self):
        return self.product.product_price * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"

    class Meta:
        db_table = "OrderItem"


class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE, null=True)
    transaction_id = models.CharField(max_length=255, unique=True, null=True)

    def __str__(self):
        return f"Payment for Order #{self.order.order_id}"

    class Meta:
        db_table = "Payment"

