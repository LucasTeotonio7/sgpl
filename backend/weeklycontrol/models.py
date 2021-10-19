from django.db import models
from products.models import Product, Purchase


class Week(models.Model):
    id = models.AutoField(primary_key=True)
    date_start = models.DateField(null=True)
    date_end = models.DateField(null=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)


class WeeklyCollection(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(null=False)
    quantity = models.FloatField(max_length=6,null=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.PROTECT)
