from copy import Error
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from products.models import Purchase
from products.serializers import PurchaseSerializer

from django.core.files.storage import default_storage
import json
# Create your views here.


@csrf_exempt
def purchaseApi(request, id=0):
    if request.method == 'GET':
        if(id != 0):
            purchase = Purchase.objects.get(id=id)
            purchase_serializer = PurchaseSerializer(purchase)
            return JsonResponse(purchase_serializer.data, safe=False)
        else:
            purchases = Purchase.objects.all().order_by('pk')
            purchases_serializer = PurchaseSerializer(purchases, many=True)
            return JsonResponse(purchases_serializer.data, safe=False)

    elif request.method == 'POST':
        purchases_data = JSONParser().parse(request)
        purchase_serializer = PurchaseSerializer(data=purchases_data)
        if purchase_serializer.is_valid():
            purchase_serializer.save()

    elif request.method == 'PUT':
        purchases_data = JSONParser().parse(request)
        purchase = Purchase.objects.get(id=purchases_data['id'])
        purchase_serializer = PurchaseSerializer(purchase,data=purchases_data)
        if purchase_serializer.is_valid():
            purchase_serializer.save()

    elif request.method == 'DELETE':
        purchase = Purchase.objects.get(id=id)
        purchase.delete()
