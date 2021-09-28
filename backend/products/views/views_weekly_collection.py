import enum
from django.utils.functional import empty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from products import models
from products.serializers import WeeklyCollectionSerializer

from django.core.files.storage import default_storage
import json


@csrf_exempt
def weekly_collection_api(request, date):
    if request.method == 'GET':
        try:
            weekly_collection = models.WeeklyCollection.objects.get(date=date)
            weekly_collection_serializer = WeeklyCollectionSerializer(weekly_collection)
            return JsonResponse(weekly_collection_serializer.data, safe=False)
        except models.WeeklyCollection.DoesNotExist:
            #tratar retorno
            pass
