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
    unitOfMeasurement = models.CharField(max_length=2, choices=MEASURE_CHOICES, null=False, blank=False)
    registrationDate = models.DateField(null=False, blank=False)
    purchasePrice = models.FloatField(max_length=6,null=False, blank=False)


class Purchase(models.Model):
    id = models.AutoField(primary_key=True)
    purchaseDate = models.DateField(null=False, blank=False)
    quantity = models.FloatField(max_length=6,null=False, blank=False)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)


class individualPurchasePrice(models.Model):
    id = models.AutoField(primary_key=True)
    purchasePrice = models.FloatField(max_length=6,null=False, blank=False)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
