# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-27 08:02
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meal', '0002_auto_20161124_1448'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.date(2016, 11, 27)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meal',
            name='modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]