from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from products.models import Purchase
from weeklycontrol import serializers
from weeklycontrol.models import Week

from django.core.files.storage import default_storage
import json


@csrf_exempt
def weektApi(request, id=0):
    if request.method == 'GET':
        if(id != 0):
            week = Week.objects.get(id=id)
            week_serializer = serializers.WeekSerializer(week)
            return JsonResponse(week_serializer.data, safe=False)
        else:
            weeks = Week.objects.all().order_by('pk')
            weeks_serializer = serializers.WeekSerializer(weeks, many=True)
            return JsonResponse(weeks_serializer.data, safe=False)

    elif request.method == 'POST':
        weeks_data = JSONParser().parse(request)
        week_serializer = serializers.WeekSerializer(data=weeks_data)
        if week_serializer.is_valid():
            week_serializer.save()
            return JsonResponse("Nova Semana Criada!", safe=False)
        return JsonResponse("Falha ao adicionar uma nova semana", safe=True)

    elif request.method == 'PUT':
        weeks_data = JSONParser().parse(request)
        week = Week.objects.get(id=weeks_data['id'])
        week_serializer = serializers.WeekSerializer(week,data=weeks_data)
        if week_serializer.is_valid():
            week_serializer.save()
            return JsonResponse('Dados da semana atualizado com sucesso"', safe=False)
        return JsonResponse('Falha ao atualizar os dados da semana', safe=True)

    elif request.method == 'DELETE':
        week = Week.objects.get(id=id)
        week.delete()
        return JsonResponse('Semana Excluída!', safe=False)


@csrf_exempt
def get_week_purchase(request, purchase_id):
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


@csrf_exempt
def get_weeks_to_product(request, product):
    if (request.method == 'GET'):
        week = Week.objects.filter(product=product).order_by('pk')
        weeks_serializer = serializers.WeekSerializer(week, many=True)
        return JsonResponse(weeks_serializer.data, safe=False)

