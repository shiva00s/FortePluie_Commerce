# apps/admin_portal/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from apps.products.models import Product, Category
from apps.orders.models import Order
from .serializers import (
    AdminProductSerializer,
    AdminCategorySerializer,
    AdminOrderSerializer,
)

class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]

class CategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAdminUser]

class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['get', 'put', 'patch', 'head', 'options']

# apps/admin_portal/views.py
# ... imports ...

class OrderAdminViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD for Orders for admins.
    Admins can view all orders and update their status.
    """
    queryset = Order.objects.prefetch_related('items', 'items__product', 'user').all().order_by('-created_at')
    serializer_class = AdminOrderSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['get', 'put', 'patch', 'head', 'options']

    # --- ADD THIS LINE ---
    filterset_fields = ['status']