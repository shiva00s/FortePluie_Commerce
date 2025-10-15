# apps/orders/models.py
from django.db import models
from django.contrib.auth.models import User
from apps.products.models import Product
from django.conf import settings

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    shipping_address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_paid = models.BooleanField(default=False)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True) # Add this line
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.email}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2) # Price at the time of order

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"
    
class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"