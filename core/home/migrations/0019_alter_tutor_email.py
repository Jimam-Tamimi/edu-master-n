# Generated by Django 4.1.2 on 2022-11-03 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0018_alter_tutor_location_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tutor",
            name="email",
            field=models.EmailField(max_length=200, unique=True),
        ),
    ]