import enum
from django.utils.functional import empty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from datetime import datetime, timedelta
from products.models import Product

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
        #TODO: refatorar p/ pegar id
        product = Product.objects.get(id=1)
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
                    total_quantity = 0
                    for c in weekly_collection:
                        while(True):
                            if date_init == c.date:
                                days.append(c.quantity)
                                total_quantity = total_quantity+c.quantity
                                date_init = add_days_to_date(date_init,1)
                                break
                            elif date_init > date_end:
                                break
                            else:
                                days.append(0)
                                date_init = add_days_to_date(date_init,1)
                    if days:
                        weekly_collection_json.append(json_fill(
                            purchase,supplier,product,days))
                    else:
                        weekly_collection_json.append(json_empty(supplier, product))
            if(not has_purchase):
                weekly_collection_json.append(json_empty(supplier, product))
        return JsonResponse(weekly_collection_json, safe=False)


def json_empty(supplier, product):
    return ({
        "purchase_id": 0,
        "name_supplier": supplier.name,
        "day1": '0',
        "day2": '0',
        "day3": '0',
        "day4": '0',
        "day5": '0',
        "day6": '0',
        "day7": '0',
        "total_qty": "0",
        "price": product.purchase_price,
        "total_price": 0,
        "status": 'ok'})


def json_fill(purchase, supplier, product, array_days):
    return ({
        "purchase_id": purchase.id,
        "name_supplier": supplier.name,
        "day1": array_days[0],
        "day2": array_days[1],
        "day3": array_days[2],
        "day4": array_days[3],
        "day5": array_days[4],
        "day6": array_days[5],
        "day7": array_days[6],
        "total_qty": sum(array_days),
        "price": product.purchase_price,
        "total_price": sum(array_days)*product.purchase_price,
        "status": 'ok'})


def str_to_date(str_date):
    """takes a date of type 'string' and turns it into type 'date'"""
    return datetime.strptime(str_date, '%Y-%m-%d').date()

def add_days_to_date(date, number_days):
    """add days to a date"""
    return date + timedelta(days=number_days)
     # implement = date.weekday()
