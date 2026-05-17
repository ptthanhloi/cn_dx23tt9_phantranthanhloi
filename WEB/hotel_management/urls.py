"""
URL configuration for hotel_management project.
"""
from django.contrib import admin
from django.urls import path, include
from hotel.views import login_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('', include('hotel.urls')),
]
