from django.http import JsonResponse
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from products.models import MainCategory
from products.serializers import MainCategorySerializer
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework import generics
from django.db.models.functions import TruncMonth
from django.db.models import Count



class UserViewSet(viewsets.ModelViewSet):
   
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class AuthUserCountView(viewsets.ModelViewSet):

    def list(self, request):
        users = User.objects.all()
        users_count = users.count()
        return Response({'count': users_count})
    

class OrdersCountView(viewsets.ModelViewSet):

    def list(self, request):
        order_items = OrderItem.objects.all()
        total_quantity = order_items.aggregate(total_quantity=Sum('quantity'))['total_quantity']
        return Response({'count': total_quantity})
    

class OrdersearningView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def list(self, request):
        order = Order.objects.all()
        total_earnings = order.filter(total_price__isnull=False).aggregate(total=Sum('total_price'))['total']
        return Response({'earnings': total_earnings})
    

class ShippingAddressViewSet(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        shipping_address = self.get_object()
        user_shipping_addresses = ShippingAddress.objects.filter(user=request.user)

        for address in user_shipping_addresses:
            if address == shipping_address:
                address.is_default = True
            else:
                address.is_default = False
            address.save()

        return Response({'detail': 'Default shipping address set.'}, status=status.HTTP_200_OK)


class GetAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        shipping_addresses = ShippingAddress.objects.filter(user=request.user)
        serializer = ShippingAddressSerializer(shipping_addresses, many=True)
        return Response(serializer.data)
    

class GetDefaultAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        default_shipping_address = ShippingAddress.objects.get(user=request.user, is_default=True)
        serializer = ShippingAddressSerializer(default_shipping_address)
        return Response(serializer.data)
    

class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class OrderItemNbViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['put'])
    def update_status(self, request, pk=None):
        order_item = self.get_object()
        new_status = request.data.get('status')

        if new_status not in [choice[0] for choice in OrderItem.ORDERITEM_STATUS_CHOICES]:
            return Response({'message': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        order_item.status = new_status
        order_item.save()

        return Response({'message': 'Order item status updated successfully.'}, status=status.HTTP_200_OK)
    

class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order_item = OrderItem.objects.filter(order__user=request.user)
        serializer = OrderItemSerializer(order_item, many=True)
        return Response(serializer.data)

class SingleOrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_item_id):
        order_item = get_object_or_404(OrderItem, order_item_id=order_item_id, order__user=request.user)
        serializer = OrderItemSerializer(order_item)
        return Response(serializer.data)


class OrderConfirmationViewSet(viewsets.ModelViewSet):

    queryset =Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def pass_order(self, request):
        user = request.user
        payment_method_id = request.data.get('payment_method')

        try:
            default_shipping_address = ShippingAddress.objects.get(user=user, is_default=True)
            payment_method = PaymentMethod.objects.get(pk=payment_method_id)
        except (ShippingAddress.DoesNotExist, PaymentMethod.DoesNotExist):
            return Response({'message': 'Invalid shipping address or payment method.'}, status=status.HTTP_400_BAD_REQUEST)

        cart = get_object_or_404(Cart, user=user)

        order = Order.objects.create(
            user=user,
            cart=cart,
            shipping_address=default_shipping_address,
            payment_method=payment_method
        )

        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.get_total_price()
            )

        order.get_total_price()

        cart.clear()
        cart.delete()

        return Response({'message': 'Order confirmed successfully.'}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['put'])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')

        if new_status not in [choice[0] for choice in Order.ORDER_STATUS_CHOICES]:
            return Response({'message': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = new_status
        order.save()

        return Response({'message': 'Order status updated successfully.'}, status=status.HTTP_200_OK)
    
class NewUsersStatisticsView(generics.ListAPIView):
    def list(self, request):
        User = get_user_model()
        queryset = User.objects.annotate(
            registration_month=TruncMonth('date_joined')
        ).values('registration_month').annotate(new_users_count=Count('id'))
        
        return Response(queryset)
    
class OrderItemByProductViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    @property
    def queryset(self):
        user = self.request.user
        queryset = OrderItem.objects.filter(product__user=user)
        return queryset


class OrderStatusUpdateView(APIView):
    def put(self, request, order_item_id):
        try:
            order_item = OrderItem.objects.get(order_item_id=order_item_id)
            new_status = request.data.get('status')

            valid_choices = [choice[0] for choice in OrderItem.ORDERITEM_STATUS_CHOICES]
            if new_status not in valid_choices:
                return Response({'message': 'Invalid status value.'}, status=status.HTTP_400_BAD_REQUEST)

            order_item.status = new_status
            order_item.save()
            return Response({'message': 'Order status updated successfully.'}, status=status.HTTP_200_OK)
        except OrderItem.DoesNotExist:
            return Response({'message': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)