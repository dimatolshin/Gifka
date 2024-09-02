from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = '__all__'


class CreatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatePicture
        fields = '__all__'