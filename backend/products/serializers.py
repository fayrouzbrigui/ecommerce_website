from rest_framework import serializers
from .models import *
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model

class RequestSerializer(serializers.ModelSerializer):
    status = serializers.CharField(required=False)

    class Meta:
        model = Request
        fields = ['request_id', 'user', 'client_name', 'email', 'message', 'status']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')

class BrandSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image()
    
    class Meta:
        model = Brand
        fields = ('brand_id', 'brand_name', 'brand_image', 'image_url', 'createdAt')


class CategorySerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    icon_url = serializers.SerializerMethodField()
    main_category_name = serializers.CharField(source='main_category_id.main_category_name', read_only=True)

    def get_image_url(self, obj):
        return obj.get_image()
    
    def get_icon_url(self, obj):
        return obj.get_icon()

    class Meta:
        model = Category
        fields = ('category_id', 'category_name', 'main_category_name', 'category_image','category_icon','icon_url','image_url', 'main_category_id',  'createdAt')


class SubCategorySerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    icon_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category_id.category_name', read_only=True)

    def get_image_url(self, obj):
        return obj.get_image()
    
    def get_icon_url(self, obj):
        return obj.get_icon()

    class Meta:
        model = SubCategory
        fields = ('subcategory_id', 'subcategory_name', 'category_name', 'subcategory_image','subcategory_icon', 'image_url','icon_url', 'category_id',  'createdAt')


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'



class FilterOptionSerializer(serializers.ModelSerializer):

    filter_name = serializers.CharField(source='filter_id.filter_name', read_only=True)

    class Meta:
        model = FilterOption
        fields = ('filteroption_id','filteroption_name','filter_id','filter_name','createdAt')


class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)],required=False)
    comment = serializers.CharField(required=False)
    product_name = serializers.CharField(source='product_id.product_name', read_only=True)
    user = UserSerializer(read_only=True)
    rating_stars = serializers.SerializerMethodField(read_only=True)

    def get_rating_stars(self, obj):
        if obj.rating:
            return '★' * obj.rating + '☆' * (5 - obj.rating)
        else:
            return None
        
    class Meta:
        model = Review
        fields = ('review_id', 'product_id', 'user', 'rating', 'rating_stars', 'comment', 'product_name',  'created_at')

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image()
    
    class Meta:
        model = ProductImage
        fields = ('product', 'image', 'image_url')


class RelatedProductSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    brand_name = serializers.CharField(source='brand_id.brand_name', read_only=True)
    main_category_name = serializers.CharField(source='main_category_id.main_category_name', read_only=True)
    category_name = serializers.CharField(source='category_id.category_name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory_id.subcategory_name', read_only=True)
    filter_options = FilterOptionSerializer(many=True, read_only=True, source='filteroption_id')
    reviews = ReviewSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True, source="product_images")
    brand_name = serializers.CharField(source='brand_id.brand_name', read_only=True)

    def get_image_url(self, obj):
        return obj.get_image()

    class Meta:
        model = Product
        fields = ('product_id', 'product_name','brand_name', 'product_description', 'product_price', 'product_countStock', 'reviews', 'offer', 'deadline',
                  'product_image', 'image_url', 'main_category_id', 'category_id', 'subcategory_id', 'brand_id', 'trending',
                  'filteroption_id','filteroption_id', 'keyword_id','images','brand_name','main_category_name','category_name','subcategory_name','filter_options','createdAt')


class ProductSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    brand_name = serializers.CharField(source='brand_id.brand_name', read_only=True)
    main_category_name = serializers.CharField(source='main_category_id.main_category_name', read_only=True)
    category_name = serializers.CharField(source='category_id.category_name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory_id.subcategory_name', read_only=True)
    filter_options = FilterOptionSerializer(many=True, read_only=True, source='filteroption_id')
    filteroption_id = serializers.PrimaryKeyRelatedField(queryset=FilterOption.objects.all(), many=True)
    related_products = RelatedProductSerializer(many=True, required=False)
    reviews = ReviewSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True, source="product_images")
    brand_name = serializers.CharField(source='brand_id.brand_name', read_only=True)
    order_count = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image()
    
    def get_order_count(self, obj):
        return obj.get_order_count()
    
    class Meta:
        model = Product
        fields = ('user','product_id', 'product_name','brand_name','order_count', 'related_products', 'product_description', 'product_price', 'product_countStock', 'reviews', 'offer', 'deadline',
                  'product_image', 'image_url', 'main_category_id', 'category_id', 'subcategory_id', 'brand_id', 'trending',
                  'filteroption_id','filteroption_id', 'keyword_id','images','main_category_name','category_name','subcategory_name','filter_options','createdAt')


class MainCategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    icon_url = serializers.SerializerMethodField()
    products = ProductSerializer(many=True, read_only=True)

    def get_image_url(self, obj):
        return obj.get_image()
    
    def get_icon_url(self, obj):
        return obj.get_icon()

    class Meta:
        model = MainCategory
        fields = ('main_category_id', 'main_category_name', 'products', 'main_category_image','main_category_icon', 'image_url','icon_url', 'createdAt')

class FilterSeializer(serializers.ModelSerializer):
    
    main_category_id = serializers.PrimaryKeyRelatedField(queryset=MainCategory.objects.all(), many=True)
    main_categories = MainCategorySerializer(many=True, read_only=True, source='main_category_id')

    class Meta:
        model = Filter
        fields = ('filter_id', 'filter_name','main_category_id','main_category_id','main_categories','createdAt')
   


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True, source='product')
    cart = serializers.PrimaryKeyRelatedField(queryset=Cart.objects.all(), required=False, allow_null=True)


    class Meta:
        model = CartItem
        fields = ('cart_item_id', 'created_at', 'updated_at', 'product', 'cart', 'product_id','quantity')


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, obj):
        return obj.get_total_price()
    
    class Meta:
        model =Cart
        fields = ('cart_id', 'user', 'created_at', 'session_id','updated_at', 'total_price', 'items')


class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True, source='product')
    Wishlist = serializers.PrimaryKeyRelatedField(queryset=Wishlist.objects.all(), required=False, allow_null=True)


    class Meta:
        model = WishlistItem
        fields = ('wishlist_item_id', 'product', 'wishlist', 'product_id', 'Wishlist')


class WishlistSerializer(serializers.ModelSerializer):
    wishlistitems = CartItemSerializer(many=True, read_only=True)

    
    class Meta:
        model = Wishlist
        fields = ('wishlist_id', 'user', 'created_at','updated_at', 'wishlistitems', 'session_id')


class SliderSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image()

    class Meta:
        model = Slider
        fields = ('slider_id','slider_image','image_url')


class RequestSerializer(serializers.ModelSerializer):
    status = serializers.CharField(required=False)

    class Meta:
        model = Request
        fields = ['request_id', 'user', 'client_name', 'email', 'message', 'status']


class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)


    class Meta:
        model = Message
        fields = ('message_id', 'sender', 'receiver', 'message', 'sender_username')