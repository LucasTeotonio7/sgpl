# Generated by Django 3.2.6 on 2021-09-21 03:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suppliers', '0003_rename_dateofjoining_supplier_dateofjoining'),
    ]

    operations = [
        migrations.RenameField(
            model_name='supplier',
            old_name='dateOfJoining',
            new_name='date_joining',
        ),
    ]
