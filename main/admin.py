from django.contrib import admin


from .models import *
@admin.register(Profile)
class UserUpgradeAdmin(admin.ModelAdmin):
    pass

@admin.register(Picture)
class UserUpgradeAdmin(admin.ModelAdmin):
    pass

@admin.register(CreatePicture)
class UserUpgradeAdmin(admin.ModelAdmin):
    pass
