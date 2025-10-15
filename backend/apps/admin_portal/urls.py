# apps/admin_portal/urls.py
from rest_framework.routers import DefaultRouter
from .views import ProductAdminViewSet, CategoryAdminViewSet, OrderAdminViewSet

router = DefaultRouter()
router.register(r'products', ProductAdminViewSet, basename='admin-products')
router.register(r'categories', CategoryAdminViewSet, basename='admin-categories')
router.register(r'orders', OrderAdminViewSet, basename='admin-orders')

urlpatterns = router.urls