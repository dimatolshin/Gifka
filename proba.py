from PIL import Image, ImageDraw, ImageFont, ImageSequence
from io import BytesIO


def abc(gif_file, text, position, start_frame, end_frame, font_size, font_mons, text_color):
    gif = Image.open(gif_file)
    frames = []
    move_duration = 6  # Количество кадров для перемещения текста
    move_out_duration = 10  # Количество кадров для перемещения текста вправо

    for i in range(gif.n_frames):
        gif.seek(i)
        frame = gif.copy()
        if start_frame <= i <= end_frame:
            draw = ImageDraw.Draw(frame)
            font = ImageFont.truetype(font_mons, font_size)

            # Рассчитываем позицию текста
            if i < start_frame + move_duration:
                x = int(position[0] * (i - start_frame) / move_duration)
            else:
                x = position[0]
            y = position[1]

            # Создаем текст с указанным цветом
            text_overlay = Image.new('RGBA', frame.size, (255, 255, 255, 0))
            text_draw = ImageDraw.Draw(text_overlay)
            text_draw.text((x, y), text, font=font, fill=text_color)

            # Объединяем текст с кадром
            frame = Image.alpha_composite(frame.convert('RGBA'), text_overlay)

        # Добавляем движение текста вправо после end_frame
        elif i > end_frame and i <= end_frame + move_out_duration:
            draw = ImageDraw.Draw(frame)
            font = ImageFont.truetype(font_mons, font_size)
            alpha = 255  # Текст всегда полностью видим
            x = position[0] + int((i - end_frame) * 10)  # Скорость движения вправо
            y = position[1]

            text_overlay = Image.new('RGBA', frame.size, (255, 255, 255, 0))
            text_draw = ImageDraw.Draw(text_overlay)
            text_draw.text((x, y), text, font=font, fill=text_color)

            frame = Image.alpha_composite(frame.convert('RGBA'), text_overlay)

        frames.append(frame.convert('RGB'))

    frames[0].save('output1.gif', save_all=True, append_images=frames[1:], loop=0)
    return print("успех")


# Пример вызова функции
gif_file = '/home/dima_tolshin/PycharmProjects/Gif/mysite/media/228.gif'
text = 'Hello world'
position = (100, 65)  # Пример координат
start_frame = 7
end_frame = 320
font_size = 22
font_mons = '/home/dima_tolshin/PycharmProjects/Gif/mysite/font/mons.ttf'
text_color = '#3a7747' # Цвет текста: зелёный

abc(gif_file, text, position, start_frame, end_frame, font_size, font_mons, text_color)