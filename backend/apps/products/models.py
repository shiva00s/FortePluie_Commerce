# apps/products/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, help_text="Unique URL-friendly name for the category.")

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    TAG_CHOICES = (
        ('trending', 'Trending'),
        ('top_rated', 'Top Rated'),
        ('new_arrival', 'New Arrival'),
    )

    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2) # Use DecimalField for money
    image = models.ImageField(upload_to='products/')
    tag = models.CharField(max_length=20, choices=TAG_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name