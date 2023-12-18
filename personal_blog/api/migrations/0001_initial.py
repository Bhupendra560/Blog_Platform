# Generated by Django 5.0 on 2023-12-18 16:20

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BLOGMODEL',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(max_length=1000)),
                ('published_date', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
            ],
            options={
                'db_table': 'tblblog',
            },
        ),
    ]
