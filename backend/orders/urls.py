from .views import *
from rest_framework.routers import DefaultRouter
from . import views
from django.urls import include, path


router = DefaultRouter()
router.register(r'Users', views.UserViewSet, basename='Users')
router.register(r'Nbusers', views.AuthUserCountView, basename='Users Nomber')
router.register(r'Nborders', views.OrdersCountView, basename='Orders Nomber')
router.register(r'earning', views.OrdersearningView, basename='Orders earning')
router.register(r'shipping-addresses', views.ShippingAddressViewSet, basename='shipping addresses')
router.register(r'payment-method', views.PaymentMethodViewSet, basename='payment methods')
router.register(r'user-order', views.OrderConfirmationViewSet, basename='OrderByUser')
router.register(r'user-order-item', views.OrderItemViewSet, basename='OrderItemByUser')
router.register(r'order-item', views.OrderItemNbViewSet, basename='OrderItem')
router.register(r'order-item-product', views.OrderItemByProductViewSet, basename='OrderItemProduct')

urlpatterns = [
    path('', include(router.urls)),
    path('addressByUser/', GetAddressView.as_view(), name='address by user'),
    path('defaultaddressByUser/', GetDefaultAddressView.as_view(), name='default address by user'),
    path('OrderItemByUser/', OrderItemView.as_view(), name='Order item by user'), 
    path('SingleOrderItemByUser/<int:order_item_id>/', SingleOrderItemView.as_view(), name='Single Order item by user'),
    path('users-statistics/', NewUsersStatisticsView.as_view(), name='users-statistics'),
    path('orderitem/<int:order_item_id>/update-status/', OrderStatusUpdateView.as_view(), name='orderitem-update-status'),

]