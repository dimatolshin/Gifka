from django.urls import path, include
from .views import *

app_name = "main"

urlpatterns = [
    path('api/users/list/<int:pk>/', Index.as_view()),
    path('activate/<str:uid>/<str:token>', CustomActivationView.as_view(), name='custom-activation'),
    path('reset/<str:uid>/<str:token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('create_gif/', Add_Text_Gif.as_view(), name='add_text_info_gif'),
    path('google_auth/', GoogleAuth.as_view()),
    path('create_promokode/',CreateGifAndProfile.as_view()),
    path('create_statick_gif/', AddTextToImage.as_view()),

]
