from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from products.models import Product, Purchase

from products import models
from suppliers.models import Supplier
from weeklycontrol import serializers
from weeklycontrol.models import WeeklyCollection, Week

from django.core.files.storage import default_storage
import json


@csrf_exempt
def get_week(request, purchase_id):
    if (request.method == 'GET'):
        purchase = Purchase.objects.get(id=purchase_id)
        week= Week.objects.get(id=purchase.week.id)
        wc_serializer = serializers.WeekSerializer(week, many=False)
        return JsonResponse(wc_serializer.data, safe=False)

@csrf_exempt
def get_last_week(request):
    if (request.method == 'GET'):
        week= Week.objects.latest('pk')
        wc_serializer = serializers.WeekSerializer(week, many=False)
        return JsonResponse(wc_serializer.data, safe=False)
