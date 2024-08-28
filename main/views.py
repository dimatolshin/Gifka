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
from .models import *


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


# class Add_Text_Gif(APIView):
#     def post(self, request):
#         # Открываем существующий GIF
#         original_gif = Image.open('/home/dima_tolshin/PycharmProjects/Gif/mysite/media/228.gif')
#
#         # Создаем список для хранения кадров с текстом
#         frames_with_text = []
#
#         # Загружаем шрифт (можно заменить на свой)
#         try:
#             font = ImageFont.truetype("arial.ttf", size=40, encoding='unic')  # Путь к вашему шрифту и размер шрифта
#         except IOError:
#             font = ImageFont.load_default()
#
#         # Определяем текст и параметры анимации
#         text = request.data.get('text', 'Animated Text')
#         color = request.data.get('color', 'green')
#
#         # Количество кадров для полного выезда и исчезновения
#         num_frames = 100
#
#         # Перебираем все кадры в GIF
#         for frame_index, frame in enumerate(ImageSequence.Iterator(original_gif)):
#             frame = frame.convert("RGBA")  # Преобразуем в формат RGBA для добавления текста
#             draw = ImageDraw.Draw(frame)
#
#             # Расчет прозрачности
#             alpha = 500  # Полная непрозрачность
#             if frame_index < num_frames // 2:
#                 alpha = int(255 * (frame_index / (num_frames // 2)))  # Появление текста
#             else:
#                 alpha = int(700 * ((num_frames - frame_index) / (num_frames // 2)))  # Исчезновение текста
#
#             # Расчет позиции текста для эффекта выезда
#             text_position = (frame_index * (frame.width // num_frames), 55)
#
#             # Создаем текстовый слой
#             text_layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
#             text_draw = ImageDraw.Draw(text_layer)
#             text_draw.text(text_position, text, font=font, fill=(255, 255, 255, alpha))
#
#             # Накладываем текст на текущий кадр
#             frame = Image.alpha_composite(frame, text_layer)
#             frames_with_text.append(frame)
#
#         # Получаем следующий номер файла
#         def get_next_file_number(directory, prefix, extension):
#             existing_files = os.listdir(directory)
#             max_number = 0
#             for filename in existing_files:
#                 if filename.startswith(prefix) and filename.endswith(extension):
#                     try:
#                         number = int(filename[len(prefix):-len(extension)])
#                         if number > max_number:
#                             max_number = number
#                     except ValueError:
#                         continue
#             return max_number + 1
#
#         media_directory = settings.MEDIA_ROOT
#         prefix = ""
#         extension = ".gif"
#         next_file_number = get_next_file_number(media_directory, prefix, extension)
#
#         # Сохраняем новый GIF с добавленным текстом
#         output_filename = f"{next_file_number}{extension}"
#         output_path = os.path.join(media_directory, output_filename)
#         frames_with_text[0].save(output_path, format='GIF',
#                                  append_images=frames_with_text[1:], save_all=True,
#                                  duration=original_gif.info['duration'], loop=0)
#
#         # Отправляем файл как ответ
#         return FileResponse(open(output_path, 'rb'), content_type='image/gif')

class Add_Text_Gif(APIView):
    def post(self, request):
        token_key = request.data.get('token')
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)
        user = token.user
        return Response({
            'promokode': user.profile.promokode,
            'svg': user.profile.gif
        })


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


class CreateGifAndProfile(APIView):
    def post(self, request):
        token_key = request.data.get('token')
        promokode = request.data.get('promokode')

        # Проверка наличия токена
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user

        if Profile.objects.filter(promokode=promokode).exists():
            return Response({'error': 'Промокод занят!'}, status=status.HTTP_400_BAD_REQUEST)

        # Получение или создание профиля пользователя
        profile, created = Profile.objects.update_or_create(
            user=user,
            defaults={
                'promokode': promokode,
                'gif': '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.5467 140.408L294.349 140.413C295.192 140.413 296.024 140.601 296.784 140.964C297.544 141.327 298.214 141.855 298.744 142.51C299.274 143.165 299.65 143.93 299.846 144.75C300.043 145.569 300.053 146.422 299.877 147.246L292.538 181.711C292.268 182.977 291.572 184.111 290.565 184.925C289.559 185.739 288.304 186.183 287.01 186.183L17.2075 186.179C16.365 186.179 15.5331 185.991 14.7727 185.628C14.0122 185.265 13.3426 184.737 12.8127 184.082C12.2827 183.427 11.9059 182.662 11.7099 181.842C11.5138 181.023 11.5034 180.17 11.6794 179.346L19.0185 144.881C19.2887 143.615 19.985 142.48 20.9912 141.666C21.9974 140.852 23.2524 140.408 24.5467 140.408Z" fill="#FFCE0A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9534 114H185.143C185.933 114 186.714 114.177 187.428 114.517C188.141 114.858 188.769 115.354 189.267 115.968C189.764 116.583 190.118 117.301 190.302 118.07C190.486 118.839 190.496 119.639 190.331 120.413L184.682 146.871C184.429 148.059 183.775 149.124 182.831 149.888C181.887 150.652 180.709 151.069 179.494 151.069H5.30496C4.51428 151.069 3.73356 150.892 3.01995 150.552C2.30634 150.211 1.67788 149.715 1.18056 149.101C0.683237 148.486 0.329636 147.768 0.145629 146.999C-0.0383779 146.23 -0.0481365 145.429 0.117068 144.656L5.76541 118.197C6.01899 117.01 6.6725 115.945 7.61676 115.181C8.56102 114.417 9.73884 114 10.9534 114Z" fill="#15513B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M29.1106 131.901C29.7717 132.175 30.3456 132.624 30.7705 133.2C31.1605 133.748 31.3555 134.403 31.3555 135.166C31.3555 136.929 30.6271 138.256 29.1703 139.145C27.7137 140.035 25.839 140.48 23.5463 140.48H13.8984L17.2418 123.799H26.1017C28.0599 123.799 29.5485 124.144 30.5675 124.835C31.5864 125.526 32.0958 126.507 32.0958 127.778C32.1121 128.665 31.8351 129.532 31.3078 130.245C30.7824 130.952 30.05 131.504 29.1106 131.901ZM21.9941 127.731L21.4926 130.209H24.3584C25.6001 130.209 26.221 129.724 26.221 128.755C26.2285 128.606 26.1972 128.458 26.1303 128.324C26.0634 128.19 25.9631 128.076 25.8391 127.993C25.5842 127.818 25.218 127.731 24.7404 127.731L21.9941 127.731ZM23.8569 136.548C24.43 136.548 24.8917 136.417 25.2419 136.154C25.5922 135.893 25.7673 135.515 25.7673 135.023C25.7745 134.865 25.7423 134.709 25.6734 134.567C25.6046 134.426 25.5014 134.304 25.3733 134.212C25.0822 134.013 24.7347 133.913 24.3822 133.926H20.7523L20.227 136.548H23.8569ZM40.3825 128.041L40.0004 129.995H47.0692L46.2573 134.046H39.1646L38.7348 136.238H47.117L46.2573 140.48H32.3585L35.7018 123.799H49.2902L48.4304 128.041L40.3825 128.041ZM54.5201 128.16H49.6245L50.5081 123.799H65.9352L65.0517 128.16H60.1559L57.6963 140.48H52.0603L54.5201 128.16Z" fill="#FFCE0A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M96.6276 123.799L87.9349 140.48H81.8929L80.9377 131.686L76.3526 140.48H70.3106L68.3047 123.799H73.869L74.9436 133.307L79.9109 123.799H85.093L86.0483 133.45L91.0872 123.799L96.6276 123.799ZM98.2276 123.799H103.863L100.52 140.48H94.8843L98.2276 123.799ZM123.064 123.799L119.721 140.48H115.088L110.288 132.711L108.735 140.48H103.243L106.586 123.799H111.219L116.019 131.567L117.571 123.799H123.064ZM142.264 123.799L138.921 140.48H134.288L129.488 132.711L127.936 140.48H122.443L125.786 123.799H130.419L135.219 131.567L136.772 123.799H142.264ZM149.667 128.041L149.285 129.995H156.354L155.542 134.046H148.449L148.02 136.238H156.402L155.542 140.48H141.643L144.987 123.799H158.575L157.715 128.041L149.667 128.041ZM175.507 129.28C175.507 130.757 175.113 132.048 174.325 133.152C173.536 134.256 172.426 135.078 170.993 135.618L173.787 140.48H167.936L165.572 136.286H164.187L163.351 140.48H157.715L161.059 123.799H168.557C170.754 123.799 172.462 124.279 173.68 125.241C174.898 126.202 175.507 127.548 175.507 129.28ZM169.799 129.828C169.799 128.7 169.099 128.136 167.697 128.136H165.811L165.023 132.044H167.339C168.119 132.044 168.725 131.849 169.154 131.46C169.584 131.071 169.799 130.527 169.799 129.828Z" fill="white"/></svg>',
            }
        )

        return Response({'status': 'Успех'}, status=status.HTTP_200_OK)
