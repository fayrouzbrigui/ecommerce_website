# Generated by Django 4.1.6 on 2023-04-25 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_brand_brand_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='maincategory',
            name='main_category_description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='subcategory_description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
