from django.urls import path
from . import views

urlpatterns = [
    path('is_active', views.is_active),
    path('submit_response', views.submit_response),
]