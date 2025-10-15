# apps/admin_portal/serializers.py
from rest_framework import serializers
from apps.products.models import Product, Category
from apps.orders.models import Order, OrderItem
from django.contrib.auth.models import User

class UserForOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class AdminOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']
        depth = 1

class AdminOrderSerializer(serializers.ModelSerializer):
    user = UserForOrderSerializer(read_only=True)
    items = AdminOrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

class AdminProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'