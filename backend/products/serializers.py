from rest_framework import serializers
from products import models



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ('id','name','unit_measurement','registration_date', 'purchase_price')


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Purchase
        fields = ('id','purchase_closing_date','closed','product_id','supplier_id','week_id')
