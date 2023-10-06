# Generated by Django 4.1.6 on 2023-06-30 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0032_request'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='status',
            field=models.CharField(blank=True, choices=[('P', 'Pending'), ('A', 'Accepted'), ('R', 'Refused')], default='P', max_length=1, null=True),
        ),
    ]
