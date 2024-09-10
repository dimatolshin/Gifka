from PIL.ImageMath import imagemath_notequal
from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from imgix import UrlBuilder
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from djoser.conf import LazySettings, settings
from djoser import utils
from rest_framework import status
from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetView, LoginView
from djoser.serializers import ActivationSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.authtoken.models import Token
from .models import *
import io
from .serializers import *


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
            Profile.objects.create(user=user)
            # Логирование и получение токена
            settings = LazySettings()
            token = utils.login_user(self.request, user)
            token_serializer_class = settings.SERIALIZERS.token
            return redirect('https://bwcreatorhub.com/auths')

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Атоматически добавляет uid и токен (сборс пароля ссылка )
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['uid'] = self.kwargs['uid']
        context['token'] = self.kwargs['token']
        return context


# class CustomLoginView(LoginView):
#     def


from django.http import FileResponse
from PIL import Image, ImageDraw, ImageFont, ImageSequence
import os
from django.conf import settings
from rest_framework.parsers import MultiPartParser


class AddTextToGif(APIView):
    def post(self, request):
        token_key = request.data.get('token')
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return JsonResponse({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user

        # Собираем параметры фильтрации из запроса
        filters = {param: request.data.get(param) for param in ['country', 'language', 'value', 'format', 'topic'] if
                   request.data.get(param)}

        if 'create_picture_id' in request.data:
            create_picture_id = request.data.get('create_picture_id')
            picturefull = get_object_or_404(CreatePicture, pk=create_picture_id)
            file_url = self._process_gif(picturefull, user, picturefull.start_frame, picturefull.end_frame)
            if file_url:
                return JsonResponse({'file_url': file_url})
        elif filters:
            # Используем динамические фильтры
            queryset = CreatePicture.objects.filter(Q(**filters) & Q(is_publish=True), name__icontains='.gif')
            file_urls = []
            for picturefull in queryset:
                if self._has_required_fields(picturefull) or picturefull.is_publish:
                    file_url = self._process_gif(picturefull, user if self._has_required_fields(picturefull) else None,
                                                 picturefull.start_frame, picturefull.end_frame)
                    if file_url:
                        file_urls.append(file_url)

            if file_urls:
                return JsonResponse({'file_urls': file_urls})

        return JsonResponse({'error': 'Нет изображений для обработки'}, status=status.HTTP_404_NOT_FOUND)

    def _has_required_fields(self, picture):
        return all(
            [picture.left is not None, picture.top is not None, picture.right is not None, picture.bottom is not None])

    def _process_gif(self, picturefull, user, start_frame, end_frame):
        gif_path = os.path.join(settings.MEDIA_ROOT, picturefull.name)
        text = user.profile.promokode if user else ""
        position = (picturefull.left, picturefull.top) if self._has_required_fields(picturefull) else (0, 0)
        font_size = picturefull.size
        font_mons = os.path.join(settings.BASE_DIR, 'font', 'mons.ttf')
        text_color = picturefull.color_text

        # Укажите путь к файлу, который вы хотите обновить
        output_filename = f"{os.path.splitext(picturefull.name)[0]}_updated.gif"
        temp_file_path = os.path.join(settings.MEDIA_ROOT, output_filename)

        try:
            self._add_text_to_gif(gif_path, text, position, start_frame, end_frame, font_size, font_mons, text_color,
                                  temp_file_path)
            file_url = self.request.build_absolute_uri(f'{settings.MEDIA_URL}{output_filename}')
            return file_url
        except Exception as e:
            return None

    def _add_text_to_gif(self, gif_file, text, position, start_frame, end_frame, font_size, font_mons, text_color,
                         output_path):
        try:
            gif = Image.open(gif_file)
        except IOError:
            return None

        frames = []
        move_duration = 6  # Количество кадров для перемещения текста
        move_out_duration = 10  # Количество кадров для перемещения текста вправо

        for i in range(gif.n_frames):
            gif.seek(i)
            frame = gif.copy()
            draw = ImageDraw.Draw(frame)
            try:
                font = ImageFont.truetype(font_mons, font_size)
            except IOError:
                return None

            if start_frame <= i <= end_frame:
                if i < start_frame + move_duration:
                    x = int(position[0] * (i - start_frame) / move_duration)
                else:
                    x = position[0]
                y = position[1]

                text_overlay = Image.new('RGBA', frame.size, (255, 255, 255, 0))
                text_draw = ImageDraw.Draw(text_overlay)
                text_draw.text((x, y), text, font=font, fill=text_color)

                frame = Image.alpha_composite(frame.convert('RGBA'), text_overlay)
            elif i > end_frame and i <= end_frame + move_out_duration:
                x = position[0] + int((i - end_frame) * 10)
                y = position[1]

                text_overlay = Image.new('RGBA', frame.size, (255, 255, 255, 0))
                text_draw = ImageDraw.Draw(text_overlay)
                text_draw.text((x, y), text, font=font, fill=text_color)

                frame = Image.alpha_composite(frame.convert('RGBA'), text_overlay)

            frames.append(frame.convert('RGB'))

        frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0)


import uuid
from django.http import JsonResponse


class AddTextToImageTest(APIView):
    def post(self, request):
        token_key = request.data.get('token')
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return JsonResponse({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user

        # Собираем параметры фильтрации из запроса
        filters = {}
        for param in ['create_picture_id', 'country', 'language', 'value', 'format', 'topic']:
            value = request.data.get(param)
            if value:
                filters[param] = value

        # Обработка по ID изображения
        if 'create_picture_id' in filters:
            create_picture_id = filters.pop('create_picture_id')
            picturefull = get_object_or_404(CreatePicture, pk=create_picture_id)
            file_url = self._process_image(picturefull, user)
            if file_url:
                return JsonResponse({'file_url': file_url})
        elif filters:
            # Используем динамические фильтры
            queryset = CreatePicture.objects.filter(Q(**filters) & Q(is_publish=True) & ~Q(name__icontains='.gif'))
            file_urls = []
            for picturefull in queryset:
                if self._has_required_fields(picturefull) or picturefull.is_publish:
                    file_url = self._process_image(picturefull,
                                                   user if self._has_required_fields(picturefull) else None)
                    if file_url:
                        file_urls.append(file_url)

            if file_urls:
                return JsonResponse({'file_urls': file_urls})

        return JsonResponse({'error': 'Нет изображений для обработки'}, status=status.HTTP_404_NOT_FOUND)

    def _has_required_fields(self, picture):
        return all(
            [picture.left is not None, picture.top is not None, picture.right is not None, picture.bottom is not None])

    def _process_image(self, picturefull, user):
        image_path = os.path.join(settings.MEDIA_ROOT, picturefull.name)
        original_image = Image.open(image_path)
        font_path = os.path.join(settings.BASE_DIR, 'font', 'mons.ttf')
        font_size = picturefull.size
        try:
            font = ImageFont.truetype(font_path, font_size, encoding='unic')
        except IOError:
            font = ImageFont.load_default()

        if user:
            draw = ImageDraw.Draw(original_image)
            text = f"{user.profile.promokode}"
            left, top, right, bottom = picturefull.left, picturefull.top, picturefull.right, picturefull.bottom

            if None in [left, top, right, bottom]:
                text_x, text_y = 0, 0
                text_width, text_height = 0, 0
            else:
                text_bbox = draw.textbbox((0, 0), text, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]

                while text_width > (right - left) or text_height > (bottom - top):
                    font_size -= 1
                    if font_size <= 5:
                        break
                    font = ImageFont.truetype(font_path, size=font_size, encoding='unic')
                    text_bbox = draw.textbbox((0, 0), text, font=font)
                    text_width = text_bbox[2] - text_bbox[0]
                    text_height = text_bbox[3] - text_bbox[1]

                text_x = left + (right - left - text_width) // 2
                text_y = top + (bottom - top - text_height) // 2

            if not (None in [left, top, right, bottom]):
                draw.text((text_x, text_y), text, font=font, fill=f"{picturefull.color_text}")

        if original_image.mode in ("RGBA", "LA") or (
                original_image.mode == "P" and "transparency" in original_image.info):
            original_image = original_image.convert("RGB")

        # Генерируем уникальное имя для обновленного изображения
        output_filename = f"{os.path.splitext(picturefull.name)[0]}_updated.jpg"
        temp_file_path = os.path.join(settings.MEDIA_ROOT, output_filename)
        original_image.save(temp_file_path, format='JPEG')

        # Формируем URL для доступа к файлу
        file_url = self.request.build_absolute_uri(f'{settings.MEDIA_URL}{output_filename}')
        return file_url


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
                Profile.objects.create(user=user, is_google_profile=True)

            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Успешный вход через google аккаунт.", "token": token.key},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Неверные данные'}, status=status.HTTP_404_NOT_FOUND)


class CreatePromocodeAndProfile(APIView):
    def post(self, request):
        token_key = request.data['token']
        promocode = str(request.data['promocode'])

        if len(promocode) > 15 or len(promocode) < 3:
            return Response({'error': 'Символов не может быть меньше 3 и не больше 15 '})

        # Проверка наличия токена
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user

        if Profile.objects.filter(promokode=promocode).exists():
            return Response({'error': 'Промокод занят!'}, status=status.HTTP_400_BAD_REQUEST)

        # Получение или создание профиля пользователя
        profile, created = Profile.objects.update_or_create(
            user=user,
            defaults={
                'promokode': promocode,
                'gif': '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.5467 140.408L294.349 140.413C295.192 140.413 296.024 140.601 296.784 140.964C297.544 141.327 298.214 141.855 298.744 142.51C299.274 143.165 299.65 143.93 299.846 144.75C300.043 145.569 300.053 146.422 299.877 147.246L292.538 181.711C292.268 182.977 291.572 184.111 290.565 184.925C289.559 185.739 288.304 186.183 287.01 186.183L17.2075 186.179C16.365 186.179 15.5331 185.991 14.7727 185.628C14.0122 185.265 13.3426 184.737 12.8127 184.082C12.2827 183.427 11.9059 182.662 11.7099 181.842C11.5138 181.023 11.5034 180.17 11.6794 179.346L19.0185 144.881C19.2887 143.615 19.985 142.48 20.9912 141.666C21.9974 140.852 23.2524 140.408 24.5467 140.408Z" fill="#FFCE0A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9534 114H185.143C185.933 114 186.714 114.177 187.428 114.517C188.141 114.858 188.769 115.354 189.267 115.968C189.764 116.583 190.118 117.301 190.302 118.07C190.486 118.839 190.496 119.639 190.331 120.413L184.682 146.871C184.429 148.059 183.775 149.124 182.831 149.888C181.887 150.652 180.709 151.069 179.494 151.069H5.30496C4.51428 151.069 3.73356 150.892 3.01995 150.552C2.30634 150.211 1.67788 149.715 1.18056 149.101C0.683237 148.486 0.329636 147.768 0.145629 146.999C-0.0383779 146.23 -0.0481365 145.429 0.117068 144.656L5.76541 118.197C6.01899 117.01 6.6725 115.945 7.61676 115.181C8.56102 114.417 9.73884 114 10.9534 114Z" fill="#15513B"/><path fill-rule="evenodd" clip-rule="evenodd" d="M29.1106 131.901C29.7717 132.175 30.3456 132.624 30.7705 133.2C31.1605 133.748 31.3555 134.403 31.3555 135.166C31.3555 136.929 30.6271 138.256 29.1703 139.145C27.7137 140.035 25.839 140.48 23.5463 140.48H13.8984L17.2418 123.799H26.1017C28.0599 123.799 29.5485 124.144 30.5675 124.835C31.5864 125.526 32.0958 126.507 32.0958 127.778C32.1121 128.665 31.8351 129.532 31.3078 130.245C30.7824 130.952 30.05 131.504 29.1106 131.901ZM21.9941 127.731L21.4926 130.209H24.3584C25.6001 130.209 26.221 129.724 26.221 128.755C26.2285 128.606 26.1972 128.458 26.1303 128.324C26.0634 128.19 25.9631 128.076 25.8391 127.993C25.5842 127.818 25.218 127.731 24.7404 127.731L21.9941 127.731ZM23.8569 136.548C24.43 136.548 24.8917 136.417 25.2419 136.154C25.5922 135.893 25.7673 135.515 25.7673 135.023C25.7745 134.865 25.7423 134.709 25.6734 134.567C25.6046 134.426 25.5014 134.304 25.3733 134.212C25.0822 134.013 24.7347 133.913 24.3822 133.926H20.7523L20.227 136.548H23.8569ZM40.3825 128.041L40.0004 129.995H47.0692L46.2573 134.046H39.1646L38.7348 136.238H47.117L46.2573 140.48H32.3585L35.7018 123.799H49.2902L48.4304 128.041L40.3825 128.041ZM54.5201 128.16H49.6245L50.5081 123.799H65.9352L65.0517 128.16H60.1559L57.6963 140.48H52.0603L54.5201 128.16Z" fill="#FFCE0A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M96.6276 123.799L87.9349 140.48H81.8929L80.9377 131.686L76.3526 140.48H70.3106L68.3047 123.799H73.869L74.9436 133.307L79.9109 123.799H85.093L86.0483 133.45L91.0872 123.799L96.6276 123.799ZM98.2276 123.799H103.863L100.52 140.48H94.8843L98.2276 123.799ZM123.064 123.799L119.721 140.48H115.088L110.288 132.711L108.735 140.48H103.243L106.586 123.799H111.219L116.019 131.567L117.571 123.799H123.064ZM142.264 123.799L138.921 140.48H134.288L129.488 132.711L127.936 140.48H122.443L125.786 123.799H130.419L135.219 131.567L136.772 123.799H142.264ZM149.667 128.041L149.285 129.995H156.354L155.542 134.046H148.449L148.02 136.238H156.402L155.542 140.48H141.643L144.987 123.799H158.575L157.715 128.041L149.667 128.041ZM175.507 129.28C175.507 130.757 175.113 132.048 174.325 133.152C173.536 134.256 172.426 135.078 170.993 135.618L173.787 140.48H167.936L165.572 136.286H164.187L163.351 140.48H157.715L161.059 123.799H168.557C170.754 123.799 172.462 124.279 173.68 125.241C174.898 126.202 175.507 127.548 175.507 129.28ZM169.799 129.828C169.799 128.7 169.099 128.136 167.697 128.136H165.811L165.023 132.044H167.339C168.119 132.044 168.725 131.849 169.154 131.46C169.584 131.071 169.799 130.527 169.799 129.828Z" fill="white"/></svg>',
            }
        )

        return Response({'status': 'Успех'}, status=status.HTTP_200_OK)


class LoadPicture(APIView):
    def post(self, request):
        try:
            files = request.FILES.getlist('photos')
            photos = []
            for file in files:
                photo = Picture.objects.create(photo=file)
                photos.append(photo)
            serializer = PhotoSerializer(photos, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response({'Error': 'Массив пустой'}, status=status.HTTP_404_NOT_FOUND)


class GetProfile(APIView):
    def get(self, request, token):
        try:
            token = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)
        user = token.user

        return Response({'is_admin': f'{user.profile.is_admin}',
                         'promocode': user.profile.promokode,
                         'is_google_profile': user.profile.is_google_profile}, status=status.HTTP_200_OK)


class GetIsPublish(APIView):
    def post(self, request):
        full_picture_id = request.data['full_picture_id']
        full_picture = get_object_or_404(CreatePicture, id=full_picture_id)
        full_picture.is_publish = True
        full_picture.save()
        return Response({'data': 'Успешно добавлена фотография в общий пул'})


class CreateOrUpdateFullPicture(APIView):
    def post(self, request):
        # Получаем данные из запроса
        picture_data_list = request.data.get('pictures', [])

        if not picture_data_list:
            return Response({'error': 'Не предоставлены данные для создания или обновления'},
                            status=status.HTTP_400_BAD_REQUEST)

        responses = []
        for picture_data in picture_data_list:
            picture_id = picture_data.get('picture_id')
            full_picture_id = picture_data.get('full_picture_id')

            if not (picture_id or full_picture_id):
                responses.append({'error': 'Не указан ни один из ключей: picture_id или full_picture_id'})
                continue

            if full_picture_id:
                # Обновляем существующий объект
                full_picture = get_object_or_404(CreatePicture, id=full_picture_id)
                partial = True  # Частичное обновление
            else:
                # Создаем новый объект
                picture = get_object_or_404(Picture, id=picture_id)
                full_picture = CreatePicture(picture=picture)
                partial = False  # Полное создание

            # Подготавливаем данные для сериализатора
            data = {
                'picture': full_picture.picture.id,
                'name': str(full_picture.picture.photo),
                'country': picture_data.get('country', full_picture.country),
                'language': picture_data.get('language', full_picture.language),
                'value': picture_data.get('value', full_picture.value),
                'format': picture_data.get('format', full_picture.format),
                'topic': picture_data.get('topic', full_picture.topic),
                'left': picture_data.get('left', full_picture.left),
                'right': picture_data.get('right', full_picture.right),
                'top': picture_data.get('top', full_picture.top),
                'bottom': picture_data.get('bottom', full_picture.bottom),
                'color_text': picture_data.get('color', full_picture.color_text),
                'size': picture_data.get('size', full_picture.size)
            }
            serializer = CreatePhotoSerializer(full_picture, data=data, partial=partial)

            if serializer.is_valid():
                serializer.save()
                responses.append({'status': 'Успех', 'picture_id': full_picture.id})
            else:
                responses.append({'error': 'Неправильные данные', 'details': serializer.errors})

        # Проверка на наличие ошибок
        errors = [response for response in responses if 'error' in response]
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'Успех', 'results': responses}, status=status.HTTP_200_OK)


class AllPicture(APIView):
    def get(self, request):
        data = []
        try:
            picture = Picture.objects.filter(~Q(photo__icontains='.gif'))
            picture_with_cord = CreatePicture.objects.filter(~Q(name__icontains='.gif'))
            # Обработка изображений из CreatePicture
            if picture_with_cord:
                for i in picture_with_cord:
                    data.append({
                        'url': request.build_absolute_uri(f'/media/{i.name}'),
                        'name': i.name,
                        'country': i.country,
                        'language': i.language,
                        'value': i.value,
                        'format': i.format,
                        'topic': i.topic,
                        'is_publish': i.is_publish,
                        'color_text': i.color_text,
                        'left': i.left,
                        'right': i.right,
                        'top': i.top,
                        'bottom': i.bottom,
                        'full_picture_id': i.pk,
                        'size': i.size,
                    })

            # Обработка изображений из Picture
            existing_names = {item['name'] for item in data}
            if picture:
                for i in picture:
                    if i.photo not in existing_names:
                        data.append({
                            'url': request.build_absolute_uri(f'/media/{i.photo}'),
                            'picture_id': i.pk
                        })

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'Error': f'Нет картинок: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AllGif(APIView):
    def get(self, request):
        data = []
        try:
            gif = Picture.objects.filter(photo__icontains='.gif')
            gif_with_cord = CreatePicture.objects.filter(name__icontains='.gif')
            # Обработка изображений из CreatePicture
            if gif_with_cord:
                for i in gif_with_cord:
                    data.append({
                        'url': request.build_absolute_uri(f'/media/{i.name}'),
                        'name': i.name,
                        'country': i.country,
                        'language': i.language,
                        'value': i.value,
                        'format': i.format,
                        'topic': i.topic,
                        'is_publish': i.is_publish,
                        'color_text': i.color_text,
                        'left': i.left,
                        'right': i.right,
                        'top': i.top,
                        'bottom': i.bottom,
                        'full_picture_id': i.pk,
                        'size': i.size,
                    })

            # Обработка изображений из Picture
            existing_names = {item['name'] for item in data}
            if gif:
                for i in gif:
                    if i.photo not in existing_names:
                        data.append({
                            'url': request.build_absolute_uri(f'/media/{i.photo}'),
                            'picture_id': i.pk
                        })

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'Error': f'Нет картинок: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteGoogleAccount(APIView):
    def post(self, request):
        try:
            token_key = request.data['token']
            token = Token.objects.get(key=token_key)
            user = token.user
            user.delete()
            return Response({"Success": 'Удаление прошло успешно'}, status=status.HTTP_200_OK)
        except:
            return Response({'Error': 'Неудачно'})


class ChangePromocode(APIView):
    def post(self, request):
        token_key = request.data.get('token')
        promo = request.data.get('promocode')

        if len(promo) > 15 or len(promo) < 3:
            return Response({'error': 'Символов не может быть меньше 3 и не больше 15 '})

        if not token_key or not promo:
            return Response({'Error': 'Token or promocode not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Получаем токен и пользователя
            token = Token.objects.get(key=token_key)
            user = token.user

            # Проверяем, занят ли промокод
            if User.objects.filter(profile__promokode=promo).exists():
                return Response({'Error': 'Промокод уже занят'}, status=status.HTTP_400_BAD_REQUEST)

            # Обновляем промокод пользователя
            user.profile.promokode = promo
            user.profile.save()

            return Response({"Success": 'Изменение прошло успешно'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'Error': 'Invalid token'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteFullPicture(APIView):
    def post(self, request):
        try:
            token = request.data['token']
            tokene = Token.objects.get(key=token)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)
        user = tokene.user
        full_picture_id = request.data['full_picture_id']
        if user.profile.is_admin == True:
            data = get_object_or_404(CreatePicture, id=full_picture_id)
            data.delete()
            return Response({'Success': 'Удаление прошло успешно'}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Недостаточно прав'}, status=status.HTTP_400_BAD_REQUEST)


class FilterAdminGif(APIView):
    def post(self, request):
        token_key = request.data.get('token')

        # Проверка наличия токена и его валидности
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user
        if not user.profile.is_admin:
            return Response({'error': 'Недостаточно прав'}, status=status.HTTP_403_FORBIDDEN)

        # Собираем параметры фильтрации из запроса
        filters = {param: request.data.get(param) for param in ['country', 'language', 'value', 'format', 'topic'] if
                   request.data.get(param) != ''}

        # Фильтрация изображений
        gif_with_cord = CreatePicture.objects.filter(Q(**filters), name__icontains='.gif')

        data = []
        if gif_with_cord.exists():
            for i in gif_with_cord:
                data.append({
                    'url': request.build_absolute_uri(f'/media/{i.name}'),
                    'name': i.name,
                    'country': i.country,
                    'language': i.language,
                    'value': i.value,
                    'format': i.format,
                    'topic': i.topic,
                    'is_publish': i.is_publish,
                    'color_text': i.color_text,
                    'left': i.left,
                    'right': i.right,
                    'top': i.top,
                    'bottom': i.bottom,
                    'full_picture_id': i.pk,
                    'size': i.size,
                })
        return Response(data, status=status.HTTP_200_OK)


class FilterAdminPicture(APIView):
    def post(self, request):
        token_key = request.data.get('token')

        # Проверка наличия токена и его валидности
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user
        if not user.profile.is_admin:
            return Response({'error': 'Недостаточно прав'}, status=status.HTTP_403_FORBIDDEN)

        # Собираем параметры фильтрации из запроса
        filters = {param: request.data.get(param) for param in ['country', 'language', 'value', 'format', 'topic'] if
                   request.data.get(param) != ''}

        # Фильтрация изображений
        picture_with_cord = CreatePicture.objects.filter(Q(**filters) & ~Q(name__icontains='.gif'))

        data = []
        if picture_with_cord.exists():
            for i in picture_with_cord:
                data.append({
                    'url': request.build_absolute_uri(f'/media/{i.name}'),
                    'name': i.name,
                    'country': i.country,
                    'language': i.language,
                    'value': i.value,
                    'format': i.format,
                    'topic': i.topic,
                    'is_publish': i.is_publish,
                    'color_text': i.color_text,
                    'left': i.left,
                    'right': i.right,
                    'top': i.top,
                    'bottom': i.bottom,
                    'full_picture_id': i.pk,
                    'size': i.size,
                })
        return Response(data, status=status.HTTP_200_OK)
