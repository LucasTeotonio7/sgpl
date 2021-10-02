from django.utils.translation import deactivate_all
from suppliers.models import Supplier
from django.db import models

# Create your models here.


class Product(models.Model):
    MEASURE_CHOICES = (
        ("KG", "Kilograma"),
        ("G", "Grama"),
        ("L", "Litro"),
        ("ML", "Mililitro")
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    unit_measurement = models.CharField(max_length=2, choices=MEASURE_CHOICES, null=False, blank=False)
    registration_date = models.DateField(null=False, blank=False)
    purchase_price = models.FloatField(max_length=6,null=False, blank=False)


class Week(models.Model):
    id = models.AutoField(primary_key=True)
    date_start = models.DateField(null=True)
    date_end = models.DateField(null=True)


class Purchase(models.Model):
    id = models.AutoField(primary_key=True)
    purchase_closing_date = models.DateField(null=True)
    closed = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
    week = models.ForeignKey(Week, on_delete=models.PROTECT, null=True)


class IndividualPurchasePrice(models.Model):
    id = models.AutoField(primary_key=True)
    purchase_price = models.FloatField(max_length=6,null=False, blank=False)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)


class WeeklyCollection(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(null=False, unique=True)
    quantity = models.FloatField(max_length=6,null=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.PROTECT)
