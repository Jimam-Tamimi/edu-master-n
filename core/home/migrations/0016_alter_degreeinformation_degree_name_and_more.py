# Generated by Django 4.1.2 on 2022-11-02 00:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0015_tutor_location_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="degreeinformation",
            name="degree_name",
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name="degreeinformation",
            name="university_name",
            field=models.CharField(max_length=40),
        ),
    ]
