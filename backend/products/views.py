from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view



class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class MainCategoryViewSet(viewsets.ModelViewSet):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer

    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    
class SubCategoryViewSet(viewsets.ModelViewSet):
     queryset = SubCategory.objects.all()
     serializer_class = SubCategorySerializer


class CategoryByMainCategViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        main_category_id = self.kwargs['main_category_id']
        return Category.objects.filter(main_category_id=main_category_id)
    

class SubcategoryByCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return SubCategory.objects.filter(category_id=category_id)
    
class ProductListByMainCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        main_category_id = self.kwargs['main_category_id']
        return Product.objects.filter(main_category_id=main_category_id)


class KeywordViewSet(viewsets.ModelViewSet):
     queryset = Keyword.objects.all()
     serializer_class = KeywordSerializer


class FilterViewSet(viewsets.ModelViewSet):
     queryset = Filter.objects.all()
     serializer_class = FilterSeializer

    
class FilterOptionViewSet(viewsets.ModelViewSet):
     queryset = FilterOption.objects.all()
     serializer_class = FilterOptionSerializer

    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SupplierProductView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(user=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    

class AddproductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class TrendingProductsViewSet(viewsets.ModelViewSet):
    
    queryset = Product.objects.filter(trending=True)
    serializer_class = ProductSerializer


class OfferProductsViewSet(viewsets.ModelViewSet):
    
    queryset = Product.objects.filter(offer=True).exclude(deadline=None)
    serializer_class = ProductSerializer


class CartView(viewsets.ModelViewSet):
   queryset = Cart.objects.all()
   serializer_class = CartSerializer
   def create(self, request):
        # Check if the user is authenticated
        if request.user.is_authenticated:
            # User is authenticated, associate the cart with the user
            cart, _ = Cart.objects.get_or_create(user=request.user)
        else:
            # User is not authenticated, associate the cart with the session ID
            session_id = request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_id=session_id)

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
   
class GetCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = Cart.objects.get(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    

class CartItemView(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    @action(detail=True, methods=['get','post'])
    def increment_quantity(self, request, pk=None):
        try:
            cart_item = self.get_object()
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        cart_item.increment_quantity()
        cart_item.cart.total_price = cart_item.cart.get_total_price()
        cart_item.cart.save()

        serializer = CartSerializer(cart_item.cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get','post'])
    def decrement_quantity(self, request, pk=None):
        try:
            cart_item = self.get_object()
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        cart_item.decrement_quantity()
        cart_item.cart.total_price = cart_item.cart.get_total_price()
        cart_item.cart.save()

        serializer = CartSerializer(cart_item.cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['delete'])
    def cart_item_destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        cart = instance.cart
        self.perform_destroy(instance)
        cart.total_price = cart.get_total_price()
        cart.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
   

class AddToCartView(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        session_id = request.session.session_key

        # If the user is authenticated, associate the cart with the user
        if request.user.is_authenticated:
            cart, _  = Cart.objects.get_or_create(user=request.user)
        else:
            # If the user is anonymous, associate the cart with the session ID
            cart, _ = Cart.objects.get_or_create(session_id=session_id)

        # Add the item to the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)
        if not created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)
        cart_item.save()
        # Serialize the cart item
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q')
        if query is not None:
            products = Product.objects.filter(product_name__icontains=query)
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.request.data.get('product_id')  
        product = Product.objects.get(pk=product_id)
        serializer.save(user=self.request.user, product_id=product)

    
class ReviewsByProductViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)    


class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all()
    serializer_class = SliderSerializer


class WishlistView(viewsets.ModelViewSet):
   queryset = Wishlist.objects.all()
   serializer_class = WishlistSerializer
   def create(self, request):
        # Check if the user is authenticated
        if request.user.is_authenticated:
            # User is authenticated, associate the cart with the user
            wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        else:
            # User is not authenticated, associate the cart with the session ID
            session_id = request.session.session_key
            wishlist, _ = Wishlist.objects.get_or_create(session_id=session_id)

        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data, status=status.HTTP_200_OK)
   
class GetWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist = Wishlist.objects.get(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
    

class WishlistItemView(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer

    @action(detail=True, methods=['delete'])
    def wishlistt_item_destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except WishlistItem.DoesNotExist:
            return Response({'error': 'wishlist item does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        wishlist = instance.wishlist
        self.perform_destroy(instance)
        wishlist.save()

        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data, status=status.HTTP_200_OK)
   


class AddToWishlistView(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        session_id = request.session.session_key

        if request.user.is_authenticated:
            wishlist, _  = Wishlist.objects.get_or_create(user=request.user)
        else:
            wishlist, _ = Wishlist.objects.get_or_create(session_id=session_id)

        wishlist_item, _ = WishlistItem.objects.get_or_create(wishlist=wishlist, product_id=product_id)

        serializer = WishlistItemSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RemoveWishlistItemView(viewsets.ModelViewSet):
    queryset =  WishlistItem.objects.all()
    serializer_class =  WishlistItemSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            wishlist_item = self.get_object()
        except WishlistItem.DoesNotExist:
            return Response({'error': 'Wishlist item not found'}, status=status.HTTP_404_NOT_FOUND)

        wishlist_item.delete()

        # Return a success response
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class AddReview(APIView):
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def post(self, request):
        product_id = request.data.get('product_id')
        product_id = get_object_or_404(Product, pk=product_id)
        comment = request.data.get('comment')
        rating = request.data.get('rating')
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(product_id=product_id, user=request.user, comment=comment, rating=rating)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class GetMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        received_messages = Message.objects.filter(receiver=request.user)
        serializer = MessageSerializer(received_messages, many=True)
        return Response(serializer.data)
    

class GetRequestsViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class RequestStatusUpdateView(APIView):
    def put(self, request, request_id):
        try:
            request_obj = Request.objects.get(request_id=request_id)
            status = request.data.get('status')
            request_obj.status = status
            request_obj.save()
            return Response({'message': 'Request status updated successfully.'}, status=status.HTTP_200_OK)
        except Request.DoesNotExist:
            return Response({'message': 'Request not found.'}, status=status.HTTP_404_NOT_FOUND)

class GetResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        request_response = Request.objects.get(user=request.user)
        serializer = RequestSerializer(request_response)
        return Response(serializer.data)
    
@api_view(['PATCH'])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=404)

    is_supplier = request.data.get('is_supplier')
    user.is_staff = is_supplier
    user.save()

    return Response(status=200)