# apps/orders/admin.py
from django.contrib import admin
from .models import Order, OrderItem

# This allows you to edit OrderItems directly from the Order page
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product'] # Makes selecting products easier when you have many
    extra = 0 # Prevents showing extra blank forms for new items

# This class customizes how the Order model is displayed
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'status', 'is_paid', 'created_at')
    list_filter = ('status', 'is_paid')
    search_fields = ('email', 'shipping_address')
    inlines = [OrderItemInline] # Embeds the OrderItem editor in the Order page

# Register your model with its custom admin class
admin.site.register(Order, OrderAdmin)