# Generated by Django 4.1.2 on 2022-10-11 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0002_tutor_timestamp_alter_tutor_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="tutor",
            name="is_verified",
            field=models.BooleanField(default=False),
        ),
    ]
