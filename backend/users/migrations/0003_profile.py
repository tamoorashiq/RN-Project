# Generated by Django 2.2.28 on 2023-06-09 09:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_city_country_region_subregion'),
        ('users', '0002_user_is_read_terms'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('full_name', models.CharField(blank=True, max_length=200, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=200, null=True)),
                ('street_address', models.CharField(blank=True, max_length=200, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.City')),
                ('state', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.Region')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
