# apps/orders/urls.py
from django.urls import path
from .views import OrderCreateView, MyOrderListView , CartView 

urlpatterns = [
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
     path('my-orders/', MyOrderListView.as_view(), name='my-order-list'), # Add this line
     path('cart/', CartView.as_view(), name='cart-view'), # Add this line
]