from django.urls import path
from django.views.generic import TemplateView


urlpatterns = [
    path('homepage/', TemplateView.as_view(template_name='index.html'), name='home_page'),
    path('detail_view/<int:pk>/',TemplateView.as_view(template_name='blog_detail.html'), name='blog_detailed_view')
]