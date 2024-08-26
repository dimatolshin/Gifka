from PIL import Image, ImageDraw, ImageFont, ImageSequence
from io import BytesIO


def add_text_to_gif(input_gif_path, output_gif_path, text):
    # Открываем существующий GIF
    original_gif = Image.open(input_gif_path)

    # Создаем список для хранения кадров с текстом
    frames_with_text = []

    # Загружаем шрифт (можно заменить на свой)
    try:
        font = ImageFont.truetype("arial.ttf", 67)  # Путь к вашему шрифту и размер шрифта
    except IOError:
        font = ImageFont.load_default()

    # Перебираем все кадры в GIF
    for frame in ImageSequence.Iterator(original_gif):
        frame = frame.convert("RGBA")  # Преобразуем в формат RGBA для добавления текста
        draw = ImageDraw.Draw(frame)

        # Определяем позицию текста
        text_position = (200, 350)  # Можно изменить на нужные координаты
        draw.text(text_position, text, font=font, fill="white")

        frames_with_text.append(frame)

    # Сохраняем новый GIF с добавленным текстом
    frames_with_text[0].save(output_gif_path, format='GIF', append_images=frames_with_text[1:], save_all=True,
                             duration=original_gif.info['duration'], loop=0)


# Пример использования
input_gif_path = '/home/dima_tolshin/PycharmProjects/Gif/mysite/media/3dLI.gif'
output_gif_path = '/home/dima_tolshin/PycharmProjects/Gif/mysite/media/2.gif'
text = '312345'
add_text_to_gif(input_gif_path, output_gif_path, text)
