from django.db import models

# Create your models here.

class Supplier(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11)
    date_joining = models.DateField()
