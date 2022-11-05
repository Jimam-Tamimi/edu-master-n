# Generated by Django 4.1.2 on 2022-10-15 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0009_usermessage_has_replied"),
    ]

    operations = [
        migrations.AddField(
            model_name="triallesson",
            name="status",
            field=models.CharField(
                choices=[
                    ("REQUESTED", "REQUESTED"),
                    ("IN_PROGRESS", "IN_PROGRESS"),
                    ("COMPLETED", "COMPLETED"),
                ],
                default="REQUESTED",
                max_length=30,
            ),
            preserve_default=False,
        ),
    ]
