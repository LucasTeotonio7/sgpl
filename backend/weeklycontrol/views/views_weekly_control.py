
import enum
from django.utils.functional import empty
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from datetime import datetime, timedelta
from products.models import Product, Purchase

from weeklycontrol.models import Week, WeeklyCollection
from suppliers.models import Supplier
from weeklycontrol.serializers import WeeklyCollectionSerializer

from django.core.files.storage import default_storage
import json


#TODO: refactor as soon as possible
@csrf_exempt
def weekly_collection(request, date_start, date_end):
    date_start = str_to_date(date_start)
    date_end = str_to_date(date_end)
    if (request.method == 'GET'):
        #TODO: week -> filter by product too
        week = Week.objects.get(date_start=date_start, date_end=date_end)
        purchases = Purchase.objects.filter(week=week)
        weekly_collection_json = []
        #TODO: product -> refactor get the product id, id=1 for testing
        product = Product.objects.get(id=1)
        for supplier in Supplier.objects.all():
            has_purchase = False
            for purchase in purchases:
                if purchase.supplier.id == supplier.id:
                    has_purchase = True
                    weekly_collection = WeeklyCollection.objects.filter(
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

                    while(len(days)<7):
                        days.append(0)

                    if days:
                        weekly_collection_json.append(
                            WeeklyCollectionSerializer.json_fill_list(
                                purchase,supplier,product,days))
                    else:
                        weekly_collection_json.append(
                            WeeklyCollectionSerializer.json_empty_list(
                                supplier, product))
            if(not has_purchase):
               weekly_collection_json.append(
                            WeeklyCollectionSerializer.json_empty_list(
                                supplier, product))
        return JsonResponse(weekly_collection_json, safe=False)


#REVIEW : create a 'utils.py' for these functions
def str_to_date(str_date):
    """takes a date of type 'string' and turns it into type 'date'"""
    return datetime.strptime(str_date, '%Y-%m-%d').date()

def add_days_to_date(date, number_days):
    """add days to a date"""
    return date + timedelta(days=number_days)
     # implement = date.weekday()

# ANCHOR : remove unused functions
def get_week(date_start, date_end):
    return Week.objects.get(date_start=date_start, date_end=date_end)


def get_supplier(id):
    return Supplier.objects.get(id=id)


def get_purchase(week,supplier):
    return Purchase.objects.get(week=week, supplier=supplier)
