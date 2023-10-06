
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('supplier_account/', include('supplier_account.urls')),
    path('admin_account/', include('admin_account.urls')),
    path('products/', include('products.urls')),
    path('orders/', include('orders.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
