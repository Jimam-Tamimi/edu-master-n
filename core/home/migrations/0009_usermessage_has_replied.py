# Generated by Django 4.1.2 on 2022-10-15 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0008_usermessage_name_usermessage_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="usermessage",
            name="has_replied",
            field=models.BooleanField(default=False),
        ),
    ]
