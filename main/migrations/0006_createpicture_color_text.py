# Generated by Django 5.0.6 on 2024-09-02 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_picture_profile_flag_promokode_profile_is_admin_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='createpicture',
            name='color_text',
            field=models.CharField(default='black', max_length=100),
        ),
    ]
