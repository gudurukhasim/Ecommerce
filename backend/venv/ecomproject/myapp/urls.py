from django.urls import path
from myapp import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

urlpatterns =[
    path('',views.getRoutes,name='Routes'),
    path('products/',views.getProducts,name='products'),
    path('product/<str:pk>',views.getProduct,name='product'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfile,name='userprofile'),
    path('users/',views.getUsers,name='getusers'),
    path('users/register/',views.registerUser,name='register'),
    path('activate/<uidb64>/<token>',views.ActivateAccountView.as_view(),name='activate'),
]
