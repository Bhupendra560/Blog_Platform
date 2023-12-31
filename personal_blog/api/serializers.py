from rest_framework import serializers
from .models import BLOGMODEL

class InputSerializer(serializers.ModelSerializer):
        title = serializers.CharField(required=True)
        description = serializers.CharField(required=True, max_length=5000)
        # optional fields
        class Meta:
            model = BLOGMODEL
            fields = "__all__"

class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = BLOGMODEL
            fields = "__all__"