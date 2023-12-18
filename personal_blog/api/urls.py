from django.contrib import admin
from django.urls import path
from .views import BLOGMODELVIEW

urlpatterns = [
    path('add/', BLOGMODELVIEW.as_view(), name='add new blog'),
    path('get/', BLOGMODELVIEW.as_view(), name='get all blogs'),
    path('get/<int:pk>/', BLOGMODELVIEW.as_view(), name='get any blog'),
    path('update/<int:pk>/', BLOGMODELVIEW.as_view(), name='update blog'),
    path('delete/<int:pk>/', BLOGMODELVIEW.as_view(), name='delete blog')
]