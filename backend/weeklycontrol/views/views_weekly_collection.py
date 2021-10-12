

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

# Create your views here.

@csrf_exempt
def weekly_collection_list(request, id, date_start=None, date_end=None):
    if (request.method == 'GET'):
        supplier = Supplier.objects.get(id=id)
        week = Week.objects.get(date_start=date_start, date_end=date_end)
        purchase = Purchase.objects.get(week=week, supplier=supplier)
        weekly_collection = WeeklyCollection.objects.filter(
            date__gte=date_start, date__lte=date_end, purchase=purchase).order_by('date')
        wc_serializer = serializers.WeeklyCollectionSerializer(weekly_collection, many=True)
        return JsonResponse(wc_serializer.data, safe=False)

@csrf_exempt
def weekly_collection_form(request):
    if request.method == 'POST':
        weekly_collection_data = JSONParser().parse(request)
        weekly_collection_serializer = serializers.WeeklyCollectionSerializer(data=weekly_collection_data)
        if weekly_collection_serializer.is_valid():
            weekly_collection_serializer.save()
            return JsonResponse("Salvo com Sucesso!", safe=False)
        return JsonResponse("Ocorreu um problema", safe=True)

    elif request.method == 'PUT':
        weekly_collection_data = JSONParser().parse(request)
        weekly_collection = WeeklyCollection.objects.get(id=weekly_collection_data['id'])
        weekly_collection_serializer = serializers.WeeklyCollectionSerializer(weekly_collection,data=weekly_collection_data)
        if weekly_collection_serializer.is_valid():
            weekly_collection_serializer.save()
            return JsonResponse('Atualizado com sucesso!', safe=False)
        return JsonResponse('Falha ao atualizar', safe=True)
