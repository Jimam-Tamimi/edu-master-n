# Generated by Django 4.1.2 on 2022-11-01 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0012_alter_usermessage_tutor"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="subject",
            options={"ordering": ["-id"]},
        ),
        migrations.AlterField(
            model_name="subject",
            name="subject",
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
