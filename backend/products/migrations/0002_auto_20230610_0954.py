# Generated by Django 2.2.28 on 2023-06-10 09:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductImage',
            new_name='ProductMedia',
        ),
    ]
