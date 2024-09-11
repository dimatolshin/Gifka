from django.urls import path, include
from .views import *

app_name = "main"

urlpatterns = [
    path('activate/<str:uid>/<str:token>', CustomActivationView.as_view(), name='custom-activation'),
    path('reset/<str:uid>/<str:token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('create_gif/', AddTextToGif.as_view(), name='add_text_info_gif'),
    path('google_auth/', GoogleAuth.as_view()),
    path('create_promocode/', CreatePromocodeAndProfile.as_view()),
    path('create_statick_gif_test/', AddTextToImageTest.as_view()),
    path('get_profile/<str:token>/', GetProfile.as_view()),
    path('load_picture/', LoadPicture.as_view()),
    path('createFullPicture/', CreateOrUpdateFullPicture.as_view()),
    path('get_is_publish/', GetIsPublish.as_view()),
    path('all_picture/', AllPicture.as_view()),
    path('all_gif/',AllGif.as_view()),
    path('delete_google_account/', DeleteGoogleAccount.as_view()),
    path('change_promocode/', ChangePromocode.as_view()),
    path('filter_admin_picture/', FilterAdminPicture.as_view()),
    path('filter_admin_gif/',FilterAdminGif.as_view()),
    path('delete_fullpicture/',DeleteFullPicture.as_view()),
    path('download_image/',DownloadImage.as_view()),


]
