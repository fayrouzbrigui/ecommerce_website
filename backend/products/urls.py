from .views import *
from rest_framework.routers import DefaultRouter
from . import views
from django.urls import include, path

router = DefaultRouter()
router.register(r'MainCategory', views.MainCategoryViewSet, basename='MainCategory')
router.register(r'Category', views.CategoryViewSet, basename='Category')
router.register(r'Subcategory', views.SubCategoryViewSet, basename='Subcategory')
router.register(r'Brands', views.BrandViewSet, basename='Brands')
router.register(r'Products', views.ProductViewSet, basename='Products')
router.register(r'add-products', views.AddproductViewSet, basename='add products')
router.register(r'Trends', views.TrendingProductsViewSet, basename='Trends')
router.register(r'Offers', views.OfferProductsViewSet, basename='Offer')
router.register(r'Keywords', views.KeywordViewSet, basename='Keywords')
router.register(r'Filters', views.FilterViewSet, basename='Filters')
router.register(r'FilterOptions', views.FilterOptionViewSet, basename='FilterOptions')
router.register(r'Sliders', views.SliderViewSet, basename='Sliders')
router.register(r'main_categories/(?P<main_category_id>\d+)/categories', views.CategoryByMainCategViewSet, basename='CategoryByMainCateg')
router.register(r'categories/(?P<category_id>\d+)/subcategories', views.SubcategoryByCategoryViewSet, basename='SubcategoryByCategory')
router.register(r'reviews', views.ReviewViewSet, basename='reviews')
router.register(r'products/(?P<product_id>\d+)/reviews', views.ReviewsByProductViewSet, basename='Reviws by product')
router.register(r'products/(?P<product_id>\d+)/reviews', ReviewViewSet, basename='add new review')
router.register(r'product-images', ProductImageViewSet, basename='product images')
router.register(r'cart', CartView, basename='cart')
router.register(r'cart-items', CartItemView, basename='cart items')
router.register(r'add-to-cart', AddToCartView, basename='add-to-cart')
router.register(r'wishlist', WishlistView, basename='wishlist')
router.register(r'wishlist-items', WishlistItemView, basename='wishlist items')
router.register(r'add-to-wishlist', AddToWishlistView, basename='add-to-wishlist')
router.register(r'remove-wishlist-item', RemoveWishlistItemView, basename='remove-wishlist-item')
router.register(r'send-request', RequestViewSet, basename='send request')
router.register(r'send-message', MessageViewSet, basename='send message')
router.register(r'requests', GetRequestsViewSet, basename='get requests')

urlpatterns = [
    path('', include(router.urls)),
    path('search/', ProductSearchView.as_view(), name='product-search'),
    path('cartByUser/', GetCartView.as_view(), name='cart by user'),
    path('wishlistByUser/', GetWishlistView.as_view(), name='Wishlist by user'),
    path('add-review/', AddReview.as_view(), name='add review'),
    path('productsBySupplier/', SupplierProductView.as_view(), name='products by supplier'),
    path('requests/<int:request_id>/status/', RequestStatusUpdateView.as_view(), name='request-status-update'),
    path('response/',GetResponseView.as_view(), name='response'),
    path('messages/',GetMessagesView.as_view(), name='messages'),
    path('main-categories/<int:main_category_id>/products/', ProductListByMainCategoryAPIView.as_view(), name='product-list-by-main-category'),
    path('users/<int:user_id>/', views.update_user, name='update_user'),
]
