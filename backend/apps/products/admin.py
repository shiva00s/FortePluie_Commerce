# apps/products/admin.py
from django.contrib import admin
from .models import Category, Product

# This class customizes how the Category model is displayed
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)} # Automatically creates a URL-friendly slug from the name

# This class customizes how the Product model is displayed
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'tag', 'created_at')
    list_filter = ('category', 'tag')
    search_fields = ('name', 'description')

# Register your models with their custom admin classes
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)