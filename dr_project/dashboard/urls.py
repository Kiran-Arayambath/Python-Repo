# urls.py dashboard
from django.urls import path

from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('appointments/', views.appointments, name='appointments'),
    path('mail/', views.mail, name='mail'),
    path('delete_mail/<int:mail_id>/', views.delete_mail, name='delete_mail'),
    path('profile/', views.profile, name='profile'),
    path('tools/', views.tools, name='tools'),
    path('preceding/', views.preceding, name='preceding'),
    path('upcoming/', views.upcoming, name='upcoming'),
    path('webpage/', views.webpage, name='webpage'),
    path('update_profile/', views.update_profile, name='update_profile'),
    path('new_user/', views.new_user, name='new_user'),
    # path('edit_profile/', views.edit_profile, name='edit_profile'),
]
