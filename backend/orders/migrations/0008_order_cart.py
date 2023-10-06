# Generated by Django 4.1.6 on 2023-05-15 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_cart_cartitem'),
        ('orders', '0007_remove_order_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='cart',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, to='products.cart'),
        ),
    ]
