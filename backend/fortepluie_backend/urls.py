# fortepluie_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings              # 1. Import settings
from django.conf.urls.static import static    # 2. Import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.products.urls')),
    path('api/auth/', include('apps.users.urls')),
    path('api/', include('apps.orders.urls')),
    path('api/admin/', include('apps.admin_portal.urls')),
    path('api/', include('payments.urls')),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]

# 3. Add this block to serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)