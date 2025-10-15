# apps/orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem, Cart, CartItem, Product
from apps.products.serializers import ProductSerializer

# --- THIS SERIALIZER NOW CORRECTLY BUILDS THE FULL IMAGE URL ---
class ProductForCartSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField() # Use a method to generate the URL

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            # This is the key part: it builds the full URL (e.g., http://127.0.0.1:8000/media/...)
            return request.build_absolute_uri(obj.image.url)
        return None

# --- UPDATED CART SERIALIZERS ---
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductForCartSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']


# --- EXISTING ORDER SERIALIZERS (No changes needed) ---
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_id', 'quantity', 'price')

# apps/orders/serializers.py
# ... other code ...

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        # --- THIS IS THE FIX ---
        # Add 'created_at' to this list
        fields = ('id', 'user', 'shipping_address', 'phone_number', 'email', 'total_price', 'status', 'created_at', 'items', 'razorpay_payment_id')
        read_only_fields = ('status', 'user')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order