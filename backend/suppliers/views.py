from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from suppliers.models import Supplier
from suppliers.serializers import SupplierSerializer

from django.core.files.storage import default_storage
# Create your views here.


@csrf_exempt
def supplierApi(request, id=0):
    if request.method == 'GET':
        suppliers = Supplier.objects.all()
        suppliers_serializer = SupplierSerializer(suppliers, many=True)
        return JsonResponse(suppliers_serializer.data, safe=False)

    elif request.method == 'POST':
        suppliers_data = JSONParser().parse(request)
        supplier_serializer = SupplierSerializer(data=suppliers_data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return JsonResponse("added Sucessfully!", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        suppliers_data = JSONParser().parse(request)
        supplier = Supplier.objects.get(id=suppliers_data['id'])
        supplier_serializer = SupplierSerializer(supplier,data=suppliers_data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return JsonResponse("update sucessfully!", safe=False)
        return JsonResponse('Failed to Update', safe=False)

    elif request.method == 'DELETE':
        supplier = Supplier.objects.get(id=id)
        supplier.delete()
        return JsonResponse('Deleted Sucessfully!', safe=False)
