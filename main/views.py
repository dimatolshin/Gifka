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
from rest_framework.authtoken.models import Token


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
            return redirect('https://bwcreatorhub.com/auths')
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


from django.http import FileResponse
from PIL import Image, ImageDraw, ImageFont, ImageSequence
import os
from django.conf import settings


class Add_Text_Gif(APIView):
    def post(self, request):
        # Открываем существующий GIF
        original_gif = Image.open('/root/Gifka/media/228.gif')

        # Создаем список для хранения кадров с текстом
        frames_with_text = []

        # Загружаем шрифт (можно заменить на свой)
        try:
            font = ImageFont.truetype(size=40, encoding='unic')  # Путь к вашему шрифту и размер шрифта
        except IOError:
            font = ImageFont.load_default()

        # Перебираем все кадры в GIF
        for frame in ImageSequence.Iterator(original_gif):
            frame = frame.convert("RGBA")  # Преобразуем в формат RGBA для добавления текста
            draw = ImageDraw.Draw(frame)

            # Определяем позицию текста
            text_position = (95, 75)  # Можно изменить на нужные координаты
            draw.text(text_position, request.data.get('text', ''), font=font, fill=request.data.get('color', 'green'))

            frames_with_text.append(frame)

        # Получаем следующий номер файла
        def get_next_file_number(directory, prefix, extension):
            existing_files = os.listdir(directory)
            max_number = 0
            for filename in existing_files:
                if filename.startswith(prefix) and filename.endswith(extension):
                    try:
                        number = int(filename[len(prefix):-len(extension)])
                        if number > max_number:
                            max_number = number
                    except ValueError:
                        continue
            return max_number + 1

        media_directory = settings.MEDIA_ROOT
        prefix = ""
        extension = ".gif"
        next_file_number = get_next_file_number(media_directory, prefix, extension)

        # Сохраняем новый GIF с добавленным текстом
        output_filename = f"{next_file_number}{extension}"
        output_path = os.path.join(media_directory, output_filename)
        frames_with_text[0].save(output_path, format='GIF',
                                 append_images=frames_with_text[1:], save_all=True,
                                 duration=original_gif.info['duration'], loop=0)

        # Отправляем файл как ответ
        return FileResponse(open(output_path, 'rb'), content_type='image/gif')


class GoogleAuth(APIView):
    def post(self, request):
        email = request.data['email']
        username = request.data['username']
        if email and username:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = User.objects.create_user(email=email, username=username)
                user.set_unusable_password()
                user.is_active = True
                user.save()

            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Успешный вход через google аккаунт.", "token": token.key},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Неверные данные'}, status=status.HTTP_404_NOT_FOUND)
