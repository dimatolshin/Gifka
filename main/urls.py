from django.urls import path, include
from .views import *

app_name = "main"


urlpatterns = [
    path('api/users/list/<int:pk>/', Index.as_view()),
    path('activate/<str:uid>/<str:token>', CustomActivationView.as_view(), name='custom-activation'),
    path('reset/<str:uid>/<str:token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
