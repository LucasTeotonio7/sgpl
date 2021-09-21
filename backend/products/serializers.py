from rest_framework import serializers
from products.models import Product



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','unit_measurement','registration_date', 'purchase_price')
