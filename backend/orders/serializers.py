from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from products.serializers import ProductSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class PaymentMethodSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image()
    class Meta:
        model = PaymentMethod
        fields = ('payment_method_id', 'payment_method_name', 'payment_method_image', 'image_url', 'shipping_price', 'createdAt')


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    payment_method_name = serializers.CharField(source='payment_method.payment_method_name', read_only=True)
    payment_method = PaymentMethodSerializer(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)

    total_price = serializers.SerializerMethodField()

    def get_total_price(self, obj):
        return obj.get_total_price()
    
    class Meta:
        model = Order
        fields = ('order_id', 'user', 'cart', 'shipping_address', 'payment_method', 'payment_method_name', 'total_price', 'transaction_id', 'status', 'date_ordered', 'order_items', 'date_canceled', 'date_delivered','date_shipped','date_confirmed')


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 
    order =OrderSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True, source='product')
    order_id = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), required=False, allow_null=True)
    price = serializers.SerializerMethodField()

    def get_price(self, obj):
        return obj.get_price()

    class Meta:
        model = OrderItem
        fields = ('order_item_id', 'order_id', 'product', 'product_id', 'order', 'quantity', 'price', 'status','date_canceled', 'date_delivered','date_shipped','date_confirmed')







