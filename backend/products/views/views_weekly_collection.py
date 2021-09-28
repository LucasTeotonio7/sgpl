import enum
from django.utils.functional import empty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from products import models
from products import serializers

from django.core.files.storage import default_storage
import json


@csrf_exempt
def weekly_collection_api(request, date):
    if request.method == 'GET':
        try:
            weekly_collection = models.WeeklyCollection.objects.get(date=date)
            weekly_collection_serializer = \
                serializers.WeeklyCollectionSerializer(weekly_collection)
            return JsonResponse(weekly_collection_serializer.data, safe=False)
        except models.WeeklyCollection.DoesNotExist:
            #tratar retorno
            pass

@csrf_exempt
def purchase_api(request, date_start, date_end):
    if request.method == 'GET':
        purchase = models.Purchase.objects.filter(
            date_start=date_start, date_end=date_end)
        purchase_serializer = serializers.PurchaseSerializer(
            purchase, many=True)
        return JsonResponse(purchase_serializer.data, safe=False)
