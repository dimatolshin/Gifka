from django.shortcuts import render
from rest_framework.views import APIView
from imgix import UrlBuilder
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from djoser.conf import LazySettings, settings
from djoser import utils
from rest_framework import status
from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetView
from djoser.serializers import ActivationSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.shortcuts import redirect


class Index(APIView):
    def get(self):
        return Response({'hello': 'hello'})


# def generate_imgix_url(path, text):
#     builder = UrlBuilder("your-subdomain.imgix.net")
#
#     params = {
#         "txt": text,  # Текст для наложения
#         "txt-size": 48,  # Размер текста
#         "txt-color": "fff",  # Цвет текста (белый)
#         "txt-font": "Arial",  # Шрифт текста
#         "txt-align": "center,middle",  # Выравнивание текста
#         "txt-fit": "max",  # Текст по размеру изображения
#     }
#
#     url = builder.create_url(path, params)
#     return url
#
#
# class Create_Gif(APIView):
#     def get(self):
#         gif_path = "path/to/your/gif.gif"  # Относительный путь к GIF
#         text = "Hello, World!"
#
#         imgix_url = generate_imgix_url(gif_path, text)
#
#         context = {
#             'imgix_url': imgix_url,
#         }
#         return render(request, 'myapp/template.html', context)


class CustomActivationView(APIView):
    token_generator = default_token_generator

    def get(self, request, *args, **kwargs):
        # Декодирование UID и получение пользователя
        try:
            uid = force_str(urlsafe_base64_decode(kwargs['uid']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Неверный UID'}, status=status.HTTP_400_BAD_REQUEST)

        # Проверка токена и активация пользователя
        serializer_context = {
            'request': request,
            'view': self,
        }
        serializer = ActivationSerializer(data={'uid': kwargs['uid'], 'token': kwargs['token']},
                                          context=serializer_context)
        if serializer.is_valid():
            user.is_active = True
            user.save()
            # Логирование и получение токена
            settings = LazySettings()
            token = utils.login_user(self.request, user)
            token_serializer_class = settings.SERIALIZERS.token
            return redirect('https://github.com/dimatolshin/Helping/blob/new_branch_Dima/requirements.txt')
            # return Response(data=token_serializer_class(token).data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Атоматически добавляет uid и токен (сборс пароля ссылка )
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['uid'] = self.kwargs['uid']
        context['token'] = self.kwargs['token']
        return context


