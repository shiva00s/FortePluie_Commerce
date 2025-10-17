# backend/fortepluie_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Routes
    path('api/', include('apps.products.urls')),
    path('api/auth/', include('apps.users.urls')), # This line was likely missing
    path('api/', include('apps.orders.urls')),
    path('api/admin/', include('apps.admin_portal.urls')),
    path('api/', include('payments.urls')),

    # Password Reset Route
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]

# This is crucial for serving images locally
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)