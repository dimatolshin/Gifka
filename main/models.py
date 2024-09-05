from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    promokode = models.CharField(max_length=15, unique=True, null=True, blank=True)
    gif = models.TextField(max_length=1000000000, null=True, blank=True)
    flag_promokode = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=True)
    is_google_profile = models.BooleanField(default=False)

    def __str__(self):
        return f'email:{self.user.email}, промокод:{self.promokode}, admin:{self.is_admin}'


class Picture(models.Model):
    photo = models.ImageField(upload_to='')

    def __str__(self):
        return f'id : {self.pk}, картинка:{self.photo}'


class CreatePicture(models.Model):
    picture = models.OneToOneField(Picture, related_name="Createpicture", on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    country = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    format = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    is_publish = models.BooleanField(default=False)
    left = models.IntegerField(null=True, blank=True)
    right = models.IntegerField(null=True, blank=True)
    top = models.IntegerField(null=True, blank=True)
    bottom = models.IntegerField(null=True, blank=True)
    color_text = models.CharField(max_length=100, default='black')
    size = models.IntegerField(default=0)

    def __str__(self):
        return (f'id картинка:{self.picture.pk}, страна:{self.country}, язык:{self.language}, '
                f'валюта:{self.value}, формат:{self.format}, тема:{self.topic}, опубликован:{self.is_publish},id:{self.pk} ')
