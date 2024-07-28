from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('faq/', views.faq, name='faq'),
    path('contact/', views.contact, name='contact'),
    path('appointment/', views.appointment, name='appointment'),
    path('homepage/', views.homepage, name='homepage'),
    path('delete_mail/<int:mail_id>/', views.delete_mail, name='delete_mail'),
    path('mail/<int:mail_id>/', views.mail_detail, name='mail_detail'),  # Detail view URL pattern
]
