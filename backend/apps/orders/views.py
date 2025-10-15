# apps/orders/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, Cart, CartItem, Product
from .serializers import OrderSerializer, CartSerializer

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        # FIX: Pass the request context to the serializer
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if created:
            cart_item.quantity = quantity
        else:
            cart_item.quantity += quantity
        cart_item.save()
        
        # FIX: Pass the request context to the serializer
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        if product_id:
            try:
                CartItem.objects.get(cart=cart, product__id=product_id).delete()
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not in cart'}, status=status.HTTP_44_NOT_FOUND)
        else:
            CartItem.objects.filter(cart=cart).delete()
        
        # FIX: Pass the request context to the serializer
        serializer = CartSerializer(cart, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')