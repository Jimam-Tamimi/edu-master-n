# Generated by Django 4.1.2 on 2022-10-14 18:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0006_usermessage_tutor"),
    ]

    operations = [
        migrations.CreateModel(
            name="TrialLesson",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("email", models.EmailField(max_length=200)),
                ("date", models.DateField()),
                ("time", models.TimeField()),
                ("message", models.TextField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "tutor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="home.tutor"
                    ),
                ),
            ],
        ),
    ]