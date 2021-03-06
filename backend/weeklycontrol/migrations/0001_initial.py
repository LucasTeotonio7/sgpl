# Generated by Django 3.2.6 on 2021-10-11 01:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WeeklyCollection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField(unique=True)),
                ('quantity', models.FloatField(max_length=6, null=True)),
                ('purchase', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.purchase')),
            ],
        ),
        migrations.CreateModel(
            name='Week',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_start', models.DateField(null=True)),
                ('date_end', models.DateField(null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.product')),
            ],
        ),
    ]
