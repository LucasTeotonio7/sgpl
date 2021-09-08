from django.db import models

# Create your models here.

class Suppliers(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11)
    DateOfJoining = models.DateField()