from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    promokode = models.TextField(max_length=13, unique=True)
    gif = models.TextField(max_length=1000000000)
