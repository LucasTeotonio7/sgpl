import enum
from django.utils.functional import empty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from datetime import datetime, timedelta

from products import models
from suppliers.models import Supplier
from products import serializers

from django.core.files.storage import default_storage
import json


@csrf_exempt
def weekly_collection_api(request, date):
    if request.method == 'GET':
        try:
            weekly_collection = models.WeeklyCollection.objects.filter(date__gt=date)
            weekly_collection_serializer = \
                serializers.WeeklyCollectionSerializer(weekly_collection, many=True)
            return JsonResponse(weekly_collection_serializer.data, safe=False)
        except models.WeeklyCollection.DoesNotExist:
            return JsonResponse({}, safe=False)

@csrf_exempt
def purchase_api(request, date_start, date_end):
    if request.method == 'GET':
        purchase = models.Purchase.objects.filter(
            date_start=date_start, date_end=date_end)
        purchase_serializer = serializers.PurchaseSerializer(
            purchase, many=True)
        return JsonResponse(purchase_serializer.data, safe=False)

#TODO: refatorar
@csrf_exempt
def weekly_collection(request, date_start, date_end):
    date_start = str_to_date(date_start)
    date_end = str_to_date(date_end)
    if request.method == 'GET':
        purchases = models.Purchase.objects.filter(
                date_start=date_start, date_end=date_end)
        weekly_collection_json = []
        for supplier in Supplier.objects.all():
            has_purchase = False
            for purchase in purchases:
                if purchase.supplier.id == supplier.id:
                    has_purchase = True
                    weekly_collection = models.WeeklyCollection.objects.filter(
                        date__gte=date_start, date__lte=date_end, purchase=purchase
                    ).order_by('date')
                    days=[]
                    date_init = date_start
                    for c in weekly_collection:
                        while(True):
                            if date_init == c.date:
                                days.append(c.quantity)
                                date_init = add_days_to_date(date_init,1)
                                break
                            elif date_init > date_end:
                                break
                            else:
                                days.append('-')
                                date_init = add_days_to_date(date_init,1)
                    if days:

                        weekly_collection_json.append({
                            "purchase_id": purchase.id,
                            "name_supplier": supplier.name,
                            "day1": days[0],
                            "day2": days[1],
                            "day3": days[2],
                            "day4": days[3],
                            "day5": days[4],
                            "day6": days[5],
                            "day7": days[6],
                            "price": 0,
                            "total_price": 0,
                            "status": 'ok'})
                    else:
                        weekly_collection_json.append(json_empty(supplier))
            if(not has_purchase):
                weekly_collection_json.append(json_empty(supplier))
        return JsonResponse(weekly_collection_json, safe=False)


def json_empty(supplier):
    return ({"purchase_id": 0,"name_supplier": supplier.name,
    "day1": '-',"day2": '-',"day3": '-',"day4": '-',"day5": '-',"day6": '-',
    "day7": '-',"price": 0,"total_price": 0,"status": 'ok'})


def str_to_date(date):
    return datetime.strptime(date, '%Y-%m-%d').date()

def add_days_to_date(date, number_days):
    return date + timedelta(days=number_days)
     # date.weekday()
