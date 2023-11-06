from django.contrib import admin
from .models import *
# Register your models here.

class NewsAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug":("title",)}

class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug":("title",)}
admin.site.register(News,NewsAdmin)
admin.site.register(Tag,TagAdmin)