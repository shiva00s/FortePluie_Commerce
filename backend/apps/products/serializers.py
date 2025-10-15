# apps/products/serializers.py
from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')

class ProductSerializer(serializers.ModelSerializer):
    # This nests the full category details within the product data
    category = CategorySerializer(read_only=True) 

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'image', 'tag', 'category')