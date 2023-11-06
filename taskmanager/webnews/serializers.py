from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import News



class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model=News
        fields="__all__"

