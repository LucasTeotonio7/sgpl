from copy import Error
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from products.models import Product
from products.serializers import ProductSerializer

from django.core.files.storage import default_storage
import json
# Create your views here.


@csrf_exempt
def productApi(request, id=0):
    if request.method == 'GET':
        if(id != 0):
            product = Product.objects.get(id=id)
            product_serializer = ProductSerializer(product)
            return JsonResponse(product_serializer.data, safe=False)
        else:
            products = Product.objects.all().order_by('pk')
            products_serializer = ProductSerializer(products, many=True)
            return JsonResponse(products_serializer.data, safe=False)

    elif request.method == 'POST':
        products_data = JSONParser().parse(request)
        product_serializer = ProductSerializer(data=products_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("Produto adicionado com sucesso!", safe=False)
        return JsonResponse("Falha ao adicionar esse produto", safe=True)

    elif request.method == 'PUT':
        products_data = JSONParser().parse(request)
        product = Product.objects.get(id=products_data['id'])
        product_serializer = ProductSerializer(product,data=products_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse('Produto atualizado com sucesso!', safe=False)
        return JsonResponse('Falha ao atualizar esse produto', safe=True)

    elif request.method == 'DELETE':
        product = Product.objects.get(id=id)
        product.delete()
        return JsonResponse('Produto Excluído!', safe=False)

@csrf_exempt
def product_choices(request):
    if request.method == 'GET':
        choices = Product.MEASURE_CHOICES
        choices_json = []
        # o = None
        for t in choices:
            choices_json.append({"key": t[0], "name": t[1]})
        return JsonResponse(choices_json, safe=False)
