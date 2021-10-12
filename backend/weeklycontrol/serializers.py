from rest_framework import serializers
from weeklycontrol import models

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Week
        fields = ('id','date_start','date_end', 'product')


class WeeklyCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WeeklyCollection
        fields = ('id','date','quantity','purchase')

    def json_empty_list(supplier, product):
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

    def json_fill_list(purchase, supplier, product, array_days):
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
