# apps/products/urls.py
from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView

urlpatterns = [
    # Endpoint for listing all products
    path('products/', ProductListView.as_view(), name='product-list'),

    # Endpoint for a single product's details, e.g., /api/products/5/
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # Endpoint for listing all categories
    path('categories/', CategoryListView.as_view(), name='category-list'),
]