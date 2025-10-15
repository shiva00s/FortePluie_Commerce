# apps/products/views.py
from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# API endpoint to list all products
# Handles GET requests to /api/products/
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-created_at') # Show newest first
    serializer_class = ProductSerializer

# API endpoint to retrieve a single product by its ID
# Handles GET requests to /api/products/<id>/
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# API endpoint to list all categories
# Handles GET requests to /api/categories/
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    # Add these two lines for filtering
    filterset_fields = {
        'category__slug': ['exact'],
    }