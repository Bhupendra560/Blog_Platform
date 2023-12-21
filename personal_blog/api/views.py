from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import status
from .models import BLOGMODEL
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from .serializers import InputSerializer, OutputSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class BLOGMODELVIEW(APIView):

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # creating new Blog in db with exception handling
        serializer = InputSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.data
            blog_title = validated_data.get('title')
            blog_description = validated_data.get('description')
            try:
                new_blog = BLOGMODEL.objects.create(title = blog_title, description = blog_description)
                return Response({'message': 'Blog created successfully'}, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({'message': 'Duplicate Entry.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'message':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                # Fetching particular Blog
                blog = BLOGMODEL.objects.get(id=pk)
                serializer = OutputSerializer(blog).data
                return Response(serializer)

            except BLOGMODEL.DoesNotExist:
                return Response({'message': 'Blog with id {} not found'.format(pk)}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                # Fetching all Blogs from db
                all_blogs = BLOGMODEL.objects.all()
                if all_blogs:
                    serializer = OutputSerializer(all_blogs, many=True).data
                    return Response(serializer)
                else:
                    return Response({'message': 'Data not found'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, pk):

        try:
            # checking if Blog exist, then update it
            existing_blog = BLOGMODEL.objects.get(id=pk)
        except BLOGMODEL.DoesNotExist:
            return Response({'message': 'Blog with id {} not found'.format(pk)}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response({'message': 'Duplicate Entry.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not request.data:
            return Response({'message': 'No fields were modified'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = InputSerializer(existing_blog, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message': 'Blog updated successfully'}, status=status.HTTP_200_OK)


    def delete(self, request, pk):
        if pk is not None:
            try:
                # Deleting a particular Blog
                blog = get_object_or_404(BLOGMODEL, id=pk)
                blog.delete()
                return Response({'message': f'Blog with id {pk} deleted successfully'}, status=status.HTTP_200_OK)
            except BBLOGMODE.DoesNotExist:
                return Response({'message': 'Blog model not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

