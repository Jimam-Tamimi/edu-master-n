# Generated by Django 4.1.2 on 2022-10-14 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0005_rename_message_usermessage"),
    ]

    operations = [
        migrations.AddField(
            model_name="usermessage",
            name="tutor",
            field=models.ForeignKey(
                default=94, on_delete=django.db.models.deletion.CASCADE, to="home.tutor"
            ),
            preserve_default=False,
        ),
    ]
