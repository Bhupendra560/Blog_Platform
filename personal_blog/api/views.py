from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BLOGMODEL


class BLOGMODELVIEW(APIView):

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]



    

